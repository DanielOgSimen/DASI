import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, get, push, update } from "firebase/database";
import { env } from "$env/dynamic/private"; // Import environment variables
import firebase from "firebase/compat/app";

// Firebase configuration
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

// Initialize Firebase app
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

// henter emails fra newsletter 
async function getNewsEmails () {
    const fb = getDatabase();
    try {
        const snapshot = await get(ref(fb, "newsletter/"));
        if (snapshot.exists()) {
            const data = snapshot.val()
            return Object.values(data)
        } else {
            console.log("there is no userers signed up for newsletter")
            return []; //returnerer et tomt objekt om det ikke er data i newsletter
        }
    } 
    catch (error) {
        console.error (error);
    }
}

export async function POST({  }) {
    try {
        const newsEmail = await getNewsEmails(); 
        return new Response(
            JSON.stringify({ message: newsEmail }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify ({message: error}),
            {
                status: 500, // HTTP status code for conflict
                headers: { "Content-Type": "application/json" },
            }
        )
    }
}