import { env } from "$env/dynamic/private"; // Henter inn env

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData(); // Henter form data
		const prompt = form.get("prompt"); // Henter prompt fra form data
		const openai_key = env.OPENAI_KEY; // Henter Open AI Nøkkel fra .env
		// Printer for oversikt
		console.log(prompt);
		console.log(openai_key);

		// Send request
		const body = {
			model: "gpt-3.5-turbo", // Spesifiserer model
			messages: [{ role: "user", content: prompt }], // Alle meldingene, slik at det blir en samlet chat og ikke bare masse individuelle meldinger. Hjelper for kontekst
		};

		const response = await fetch(
			"https://api.openai.com/v1/chat/completions", // Bruker API
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${openai_key}`, // Sender med API Nøkkelen
				},
				body: JSON.stringify(body),
			}
		);
		const data = await response.json();
		const message = data["choices"][0]["message"]["content"]; // Henter ut meldingen fra responsen
		console.log(data["choices"][0]["message"]);
		return message;
	},
};
