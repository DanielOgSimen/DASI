import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "$lib/db";

// Initialiserer Firebase-appen
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Funksjon som henter id
function findId(id) {
	const db = getDatabase();
	return get(ref(db, "chats/" + id));
}

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { id } = await request.json();

		// Skriver brukerdata til Firebase-databasen
		let chat = await findId(id);

		if (chat == null || chat == undefined || !chat.exists()) {
			return new Response(JSON.stringify({ error: "Chat not found" }), {
				status: 404, // HTTP-statuskode for ikke funnet
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
				},
			});
		} else {
			// Returnerer en suksessrespons
			return new Response(
				JSON.stringify({
					message: "Chat Found successfully",
					chat: chat,
				}),
				{
					status: 200, // HTTP-statuskode for suksess
					headers: {
						"Content-Type": "application/json", // Angir at vi sender JSON-data
					},
				}
			);
		}
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
