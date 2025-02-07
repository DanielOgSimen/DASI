import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		const { message } = await request.json();
		const openai_key = env.OPENAI_KEY;

		const body = {
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					// Intruksen til hvrodan tittlen skal genereres
					content:
						"Generate a chat title based on the following message. the title should be a short summary of the message. Preferabbly 1-5 words. Make the title in the same language as the message. Do not use quotation marks.",
				},
				{ role: "user", content: message },
			],
		};
		// Sender forespørselen til OpenAI API
		const response = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${openai_key}`,
				},
				body: JSON.stringify(body),
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`OpenAI API error: ${response.statusText} - ${errorText}`
			);
		}

		const data = await response.json();
		const title = data.choices[0].message.content.trim();

		console.log("Title:", title);
		// Returnerer tittelen som en JSON-respons
		return new Response(JSON.stringify({ title }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
