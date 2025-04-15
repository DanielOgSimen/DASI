import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, get, push, update } from "firebase/database";
import { env } from "$env/dynamic/private"; // Import environment variables

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

// Check if user ID exists
async function checkIfIdExists(id) {
    const db = getDatabase();
    const snapshot = await get(ref(db, "users/" + id));
    return !snapshot.exists(); // Returns true if the user does not exist
}

// Write user data to the database
async function writeUserData(userID, where, why, news) {
    const db = getDatabase();
    try {
        return update(ref(db, "users/" + userID), {
            foundUs: where,
            whyUseUs: why,
            wantNews: news,
        });
    } catch (error) {
        console.error("Error writing user data:", error);
        throw error;
    }
}

// Add user email to the newsletter section
async function addEmailNews(userID, news) {
    const db = getDatabase();
    try {
        const newsEmailSnapshot = await get(ref(db, "users/" + userID + "/email"));
        const newsEmail = newsEmailSnapshot.val();

        if (news === true && newsEmail) {
            return update(ref(db, "newsletter/"), {
                [userID]: newsEmail, // Use userID as the key for uniqueness
            });
        } else {
            console.log("User does not want news or email is missing");
        }
    } catch (error) {
        console.error("Error adding email to newsletter:", error);
        throw error;
    }
}

// Handle POST requests
export async function POST({ request }) {
    try {
        // Parse JSON data from the request
        const { where, why, id, news } = await request.json();

        // Check if the user exists
        const exists = await checkIfIdExists(id);

        if (!exists) {
            await writeUserData(id, where, why, news);
            await addEmailNews(id, news);
            return new Response(
                JSON.stringify({ message: "User data written successfully" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "User already exists" }),
                {
                    status: 409, // HTTP status code for conflict
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}