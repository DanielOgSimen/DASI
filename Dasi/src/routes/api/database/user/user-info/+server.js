import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, get, push, update } from "firebase/database";
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
const app = initializeApp(firebaseConfig);

//sjekker om user eksiesterer, om id er null så eksisterer den ikke
function checkIfIdExists(id) {
	const db = getDatabase();
	return get(ref(db, "users/" + id)) == null;
}

function getWhere(id) {	
    const db = getDatabase();
    return get(ref(db, "users/" + id + "/foundUs"));
}


// skriver brukerdata til databasen
function writeUserData(userID, where, why) {
    const db = getDatabase();
    return update(ref(db, "users/" + userID), {
        foundUs: where,
        whyUseUs: why,
    });
}

export async function POST ({request}) {
    try {
        // Henter JSON data fra forespørselen som ble sendt til denne ruten
        const { where, why, id } = await request.json();

        // Sjekker om brukeren eksisterer
        const exists = await checkIfIdExists(id);
        const whereExists = await getWhere(id);
        // Returnerer en suksessrespons
        if (!exists) {
            writeUserData(id, where, why)
            return new Response(
                JSON.stringify({ message: whereExists }),
                {
                    status: 200, // HTTP-statuskode for suksess
                    headers: {
                        "Content-Type": "application/json", // Angir at vi sender JSON-data
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "User does not exist" }),
                {
                    status: 404, // HTTP-statuskode for suksess
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