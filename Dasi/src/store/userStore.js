import { writable } from "svelte/store"; // importerer writable fra svelte som gjør at vi kan lage en store

// @ts-ignore
function createPersistedStore(key, startValue) {
	let data = startValue; // setter data til stat value

	// legger bare til data i localstorage hvis vi er i en browser
	if (typeof window !== "undefined") {
		// setter startValue til data hvis det finnes i localstorage eller så setter vi det til startValue
		const storedValue = localStorage.getItem(key); // henter data fra localstorage hvis det finnes
		data = storedValue ? JSON.parse(storedValue) : startValue; // setter data til storedValue hvis det finnes, ellers startValue
	}

	const store = writable(data); // lager en writable store med data som defined over til  å starte med

	// hvis vi er i en browser så abonnerer vi på storen og setter dataen til localstorage
	if (typeof window !== "undefined") {
		// kjører denne koden hvis vi er i en browser
		store.subscribe((value) => {
			// ser etter endringer i storen og setter den nye dataen (value) til localstorage
			localStorage.setItem(key, JSON.stringify(value)); // setter dataen til localstorage i riktig key
		});
	}

	return store; // returnerer storen
}

export const user = createPersistedStore("user", {
	// lager en store med key 'user' og startValue som er et objekt med id, name, email og picture som er null
	id: null,
	name: null,
	email: null,
	picture: null,
	method: null,
});
