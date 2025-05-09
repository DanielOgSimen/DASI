import { env } from "$env/dynamic/private";

export function load() {
    return {
        DANIEL_DASI_ID: env.DANIEL_DASI_ID,
        SIMEN_DASI_ID: env.SIMEN_DASI_ID
    };
}