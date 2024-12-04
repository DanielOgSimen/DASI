import { writable } from 'svelte/store';

// @ts-ignore
function createPersistedStore(key, startValue) {
    let data = startValue;

    // Check if running in a browser environment
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key);
        data = storedValue ? JSON.parse(storedValue) : startValue;
    }

    const store = writable(data);

    // Only subscribe to changes if in a browser environment
    if (typeof window !== 'undefined') {
        store.subscribe((value) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}

export const user = createPersistedStore('user', {
    id: null,
    name: null,
    email: null,
    picture: null
});