import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "$lib/db";

// Initialiserer Firebase-appen
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

const loginMethods = ["google"];

// Funksjon som henter id
function findId(id, method) {
	const db = getDatabase();
	return get(ref(db, `id/${method}/${id}`));
}

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
	try {
		// Henter JSON data fra forespørselen
		const { id, method } = await request.json();

		console.log("ID:", id);
		console.log("Method:", method);

		// Validerer login-metoden
		if (!loginMethods.includes(method)) {
			return new Response(
				JSON.stringify({ error: "Invalid login method" }),
				{
					status: 400, // HTTP-statuskode for bad request
					headers: {
						"Content-Type": "application/json", // Angir at vi sender JSON-data
					},
				}
			);
		}

		// Skriver brukerdata til Firebase-databasen
		let userID = await findId(id, method);

		// Returnerer en suksessrespons
		return new Response(
			JSON.stringify({
				message: "ID Found successfully",
				id: userID.val(),
			}),
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
