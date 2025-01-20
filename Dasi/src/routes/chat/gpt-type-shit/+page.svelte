<script lang="ts">
    // Definerer variabler for å lagre brukerens input, meldingen fra serveren og eventuelle feil
    let prompt = $state('');
    let message = $state('');
    let error = $state('');

    // Async funksjon som håndterer innsending av skjemaet
    async function handleSubmit(event: Event) {
        // Forhindrer standard oppførsel for skjemaet som er å laste inn siden på nytt
        event.preventDefault();
        // Oppretter et FormData-objekt for å sende data til serveren
        const formData = new FormData();
        // Legger til brukerens input i FormData-objektet
        formData.append('prompt', prompt);

        try {
            // Sender en POST-forespørsel til '/api' endepunktet med brukerens input
            const response = await fetch('/api', {
                method: 'POST',
                body: formData
            });

            // Sjekker om responsen fra serveren er ok
            if (!response.ok) {
                // Kaster en feil hvis responsen ikke er ok
                throw new Error('Network response was not ok');
            }

            // Henter JSON-data fra responsen
            const data = await response.json();
            // Setter meldingen fra serveren til 'message' variabelen
            message = data.message;
            // Tømmer eventuelle tidligere feil
            error = '';
        } catch (err) {
            // Logger feilen i konsollen for debugging
            console.error('Fetch error:', err);
            // Setter en feilmelding til 'error' variabelen
            error = 'Failed to fetch response from server';
        }
    }
</script>

<h1>GPT TYPE SHIT</h1>
<form onsubmit={handleSubmit}>
    <label for="prompt">
        prompt:
    </label>
    <textarea name="prompt" id="prompt" rows="4" bind:value={prompt}></textarea>
    <button type="submit">Send</button>
</form>

{#if message}
    <p style="white-space: pre-wrap;">{message}</p>
{/if}

{#if error}
    <p>Error: {error}</p>
{/if}