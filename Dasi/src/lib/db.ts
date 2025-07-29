import { env } from "$env/dynamic/private";
// Initialiserer Firebase-konfigurasjonen
export const firebaseConfig = {
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