import type { Handle } from "@sveltejs/kit";
 
// Liste over godkjente domener
const validUrls: string[] = [
    "https://dasigpt.com",
    "http://dasigpt.com",
    "https://www.dasigpt.com",
    "http://www.dasigpt.com",
    ...(process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "http://127.0.0.1:5173"]
        : []),
] as const;
 
export const handle: Handle = async ({ event, resolve }) => {
    // Anvendes kun på /api ruter
    if (event.url.pathname.startsWith("/api")) {
        // Hent origin fra forespørselens headers
        const origin = event.request.headers.get("origin");
        const host = event.request.headers.get("host");
 
        // Sjekk om origin er tillatt eller om forespørselen kommer fra samme domene
        const isAllowedOrigin = origin
            ? validUrls.includes(origin)
            : host
            ? validUrls.some((url) => url.includes(host))
            : true;
 
        // Hvis dette er en preflight-forespørsel (OPTIONS), håndter den direkte
        if (event.request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": origin || "*",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
        }
 
        // Hvis origin ikke er tillatt, returner 403
        if (!isAllowedOrigin) {
            console.error(`Unauthorized origin: ${origin}, host: ${host}`);
            return new Response("Unauthorized origin", {
                status: 403,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
 
        try {
            // Behandle forespørselen normalt
            const response = await resolve(event);
 
            // Clone the response so we can modify headers
            const newResponse = new Response(response.body, response);
 
            // Legg til CORS headers
            if (origin) {
                newResponse.headers.set("Access-Control-Allow-Origin", origin);
                newResponse.headers.set(
                    "Access-Control-Allow-Credentials",
                    "true"
                );
                newResponse.headers.set(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS"
                );
                newResponse.headers.set(
                    "Access-Control-Allow-Headers",
                    "Content-Type, Authorization"
                );
            }
 
            return newResponse;
        } catch (error) {
            console.error("Error processing request:", error);
            return new Response(
                JSON.stringify({ error: "Internal Server Error" }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        ...(origin && {
                            "Access-Control-Allow-Origin": origin,
                            "Access-Control-Allow-Credentials": "true",
                        }),
                    },
                }
            );
        }
    }
 
    // For ikke-API ruter, behandle normalt
    return resolve(event);
};
 
 