import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import { firebaseConfig } from "$lib/db";

// Initialiserer Firebase-appen
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Funksjon som skriver brukerdata til Firebase-databasen
function removeChat(chatID) {
	const db = getDatabase();
	return remove(ref(db, "chats/" + chatID));
}

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { chatID } = await request.json();

		// Skriver brukerdata til Firebase-databasen
		await removeChat(chatID);

		// Returnerer en suksessrespons
		return new Response(
			JSON.stringify({ message: "Chat removed successfully" }),
			{
				status: 200, // HTTP-statuskode for suksess
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
				},
			}
		);
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
