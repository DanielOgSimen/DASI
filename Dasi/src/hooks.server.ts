import type { Handle } from "@sveltejs/kit";

// Liste over godkjente domener
const validUrls: string[] = [
	"https://dasigpt.com",
	"http://dasigpt.com",
] as const;

export const handle: Handle = async ({ event, resolve }) => {
	// Anvendes kun på /api ruter
	if (event.url.pathname.startsWith("/api")) {
		// Hent origin fra forespørselens headers
		const origin = event.request.headers.get("origin") || validUrls[0];

		// Sjekk om origin er tillatt
		const isAllowedOrigin = validUrls.includes(origin);

		// Hvis dette er en preflight-forespørsel (OPTIONS), håndter den direkte
		if (event.request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": validUrls[0],
					"Access-Control-Allow-Methods":
						"GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers":
						"Content-Type, Authorization",
				},
			});
		}

		// Hvis origin ikke er tillatt, returner 403
		if (!isAllowedOrigin) {
			return new Response("Unauthorized origin", {
				status: 403,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		// Behandle forespørselen normalt og legg til CORS-headers i responsen
		const response = await resolve(event);
		const responseData = await response.json();

		// Legg til CORS headers i original response
		response.headers.set("Access-Control-Allow-Origin", origin);
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);

		// Returner hele response-objektet uten å spesifisere enkeltfelt
		return response;
	}

	// For ikke-API ruter, behandle normalt
	return resolve(event);
};
