import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { messages } = await request.json();
		// Henter OpenAI API-nøkkelen fra .env
		const openai_key = env.OPENAI_KEY;

		// Logger meldingshistorikken og API-nøkkelen for debugging
		console.log(messages);
		console.log(openai_key);

		// Oppretter body for forespørselen til OpenAI API
		const body = {
			model: "gpt-3.5-turbo", // Spesifiserer hvilken modell som skal brukes
			messages: messages, // Inkluderer meldingshistorikken i forespørselen
		};

		// Sender forespørselen til OpenAI API
		const response = await fetch(
			"https://api.openai.com/v1/chat/completions", // URL til OpenAI API
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
			throw new Error(`OpenAI API error: ${response.statusText}`);
		}

		// Henter JSON-data fra responsen
		const data = await response.json();
		// Henter meldingen fra responsen
		const message = data.choices[0].message.content;
		// Logger meldingen for debugging
		console.log(message);

		// Returnerer meldingen som en JSON-respons
		return new Response(JSON.stringify({ message }), {
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
