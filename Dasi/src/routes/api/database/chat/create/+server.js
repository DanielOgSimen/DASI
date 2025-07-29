import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { firebaseConfig } from "$lib/db";

// Initialiserer Firebase-appen
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Funksjon for å lagre en chat for en bruker
async function saveChatForUser(userId, chatId) {
	const db = getDatabase();
	const chatRef = ref(db, `userChat/${userId}/chats`);

	// Henter eksisterende chats
	const snapshot = await get(chatRef);
	const existingChats = snapshot.exists() ? snapshot.val() : [];

	// Legger til den nye chatId på slutten av listen
	const updatedChats = [...existingChats, chatId];

	// Oppdaterer databasen med den nye listen
	await set(chatRef, updatedChats);
}
// Funksjon som håndterer GET-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { userId, chatId } = await request.json();

		// Skriver brukerdata til Firebase-databasen
		await saveChatForUser(userId, chatId);

		// Returnerer en suksessrespons
		return new Response(
			JSON.stringify({ message: "Chat saved to user with style" }),
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
