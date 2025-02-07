import { writable } from "svelte/store";

// Hent eksisterende data fra localStorage hvis vi er i nettleseren
const isBrowser = typeof window !== "undefined";
let storedChats = isBrowser
	? JSON.parse(localStorage.getItem("chats") || "{}")
	: {};

// Hvis localStorage er tom, legg til "New Chat"
if (isBrowser && Object.keys(storedChats).length === 0) {
	storedChats = {
		"New Chat": {
			title: "New Chat",
			messages: [],
			editTitle: false,
		},
	};
	localStorage.setItem("chats", JSON.stringify(storedChats));
}

// Lag en writable store
export const chatStore = writable(storedChats);

// Hvis vi er i nettleseren, lagre til localStorage ved endringer
if (isBrowser) {
	chatStore.subscribe((value) => {
		localStorage.setItem("chats", JSON.stringify(value));
	});
}
