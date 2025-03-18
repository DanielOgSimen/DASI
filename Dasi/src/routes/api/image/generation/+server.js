import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra .env filen

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { prompt, n, size } = await request.json();
		// Henter OpenAI API-nøkkelen fra .env
		const openai_key = env.OPENAI_KEY;

		// Logger prompt, antall bilder og størrelse for debugging
		console.log("Prompt:", prompt);
		console.log("Number of images:", n);
		console.log("Size:", size);

		// Oppretter body for forespørselen til OpenAI API
		const body = {
			prompt: prompt, // Bruker spesifisert prompt
			n: n || 1, // Antall bilder som skal genereres
			size: size || "1024x1024", // Størrelse på bilde(ne)
		};

		// Logger body for debugging
		console.log("Request Body:", body);

		// Sender forespørselen til OpenAI API
		const response = await fetch(
			"https://api.openai.com/v1/images/generations", // URL til OpenAI API for bildegenerering
			{
				method: "POST", // HTTP-metoden som brukes
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
					Authorization: `Bearer ${openai_key}`, // Inkluderer API-nøkkelen i forespørselen
				},
				body: JSON.stringify(body), // Konverterer body til en JSON-streng
			}
		);

		// Sjekker om responsen fra OpenAI API er ok
		if (!response.ok) {
			// Kaster en feil hvis responsen ikke er ok
			const errorText = await response.text();
			throw new Error(
				`OpenAI API error: ${response.statusText} - ${errorText}`
			);
		}

		// Henter JSON-data fra responsen
		const data = await response.json();
		// Henter URL-ene til de genererte bildene fra responsen
		const images = data.data.map((img) => img.url);
		// Logger URL-ene for debugging
		console.log("Generated Images:", images);

		// Returnerer URL-ene til de genererte bildene som en JSON-respons
		return new Response(JSON.stringify({ images }), {
			status: 200, // HTTP-statuskode for suksess
			headers: {
				"Content-Type": "application/json", // Angir at vi sender JSON-data
			},
		});
	} catch (error) {
		// Logger feilen for debugging
		console.error("Error:", error);
		// Returnerer en feilmelding som en JSON-respons
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{
				status: 500, // HTTP-statuskode for intern serverfeil
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
				},
			}
		);
	}
}
