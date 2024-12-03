import { writable } from "svelte/store";

// Hent eksisterende data fra localStorage hvis vi er i nettleseren
const isBrowser = typeof window !== "undefined";
const storedChats = isBrowser
	? JSON.parse(localStorage.getItem("chats") || "{}")
	: {
			"New Chat": {
				title: "New Chat",
				messages: [],
				editTitle: false,
			},
	  };

// Lag en writable store
export const chatStore = writable(storedChats);

// Hvis vi er i nettleseren, lagre til localStorage ved endringer
if (isBrowser) {
	chatStore.subscribe((value) => {
		localStorage.setItem("chats", JSON.stringify(value));
	});
}
