import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { firebaseConfig } from "$lib/db";
import { v4 as uuidv4 } from "uuid";

// Initialiserer Firebase-appen
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Funksjon som skriver brukerdata til Firebase-databasen
function generateUserId() {
	return uuidv4();
}

function checkIfIdExists(id, method) {
	const db = getDatabase();
	return get(ref(db, "id/" + method + "/" + id)) == null;
}

function writeId(id, method) {
	const db = getDatabase();
	let userId = generateUserId();
	while (checkIfIdExists(userId, method)) {
		userId = generateUserId();
	}
	return set(ref(db, "id/" + method + "/" + id), userId);
}

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { id, method } = await request.json();

		// Skriver brukerdata til Firebase-databasen
		await writeId(id, method);

		// Returnerer en suksessrespons
		return new Response(
			JSON.stringify({ message: "User data written successfully" }),
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
