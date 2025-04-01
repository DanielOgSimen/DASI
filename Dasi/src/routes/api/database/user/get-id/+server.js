import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil

// Initialiserer Firebase-konfigurasjonen
const firebaseConfig = {
	apiKey: env.FB_API_KEY,
	authDomain: env.FB_AUTH_DOMAIN,
	databaseURL:
		"https://dasi-gpt-b2beb-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: env.FB_PROJECT_ID,
	storageBucket: env.FB_STORAGE_BUCKET,
	messagingSenderId: env.FB_MESSAGING_SENDER_ID,
	appId: env.FB_APP_ID,
	measurementId: env.FB_MEASUREMENT_ID,
};

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
