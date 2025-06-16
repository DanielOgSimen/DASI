import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { messages, model } = await request.json();
		// Henter OpenAI API-nøkkelen fra .env
		const openai_key = env.OPENAI_KEY;

		if (!openai_key) {
			throw new Error("OpenAI API key is not configured");
		}

		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			throw new Error("Invalid messages format");
		}

		const validMessages = messages.filter((msg) => msg.content && msg.role);

		if (validMessages.length === 0) {
			throw new Error("No valid messages provided");
		}

		// Oppretter body for forespørselen til OpenAI API
		const body = {
			model: model || "gpt-3.5-turbo-0125", // Updated to latest model
			messages: validMessages,
			temperature: 0.7,
			max_tokens: 1000,
		};

		// Logger body for debugging
		console.log("Request Body:", body);

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
			const errorData = await response.json();
			throw new Error(
				`OpenAI API error: ${response.status} - ${
					errorData.error?.message || "Unknown error"
				}`
			);
		}

		// Henter JSON-data fra responsen
		const data = await response.json();
		// Henter meldingen fra responsen
		const message = data.choices[0].message.content;

		// Logger meldingen for debugging
		console.log("Response Message:", message);

		// Returnerer meldingen som en JSON-respons
		return new Response(JSON.stringify({ message }), {
			status: 200, // HTTP-statuskode for suksess
			headers: {
				"Content-Type": "application/json", // Angir at vi sender JSON-data
			},
		});
	} catch (error) {
		// Logger feilen for debugging
		console.error("Text generation error:", error);
		const errorMessage =
			error instanceof Error
				? error.message
				: "Failed to generate response";
		const errorStack = error instanceof Error ? error.stack : undefined;

		// Returnerer en feilmelding som en JSON-respons
		return new Response(
			JSON.stringify({
				error: errorMessage,
				details: errorStack,
			}),
			{
				status: 500, // HTTP-statuskode for intern serverfeil
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
				},
			}
		);
	}
}
