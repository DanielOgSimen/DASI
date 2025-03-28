<script lang="ts">
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import ImageMessage from './../../components/chat/image-message.svelte';
    import { on } from 'svelte/events';

    let generatedImageUrl: string | null = null;
    let prompt = "";
    let height = 512;
    let width = 512;
    let feedbackMessage: string | null = null;
    let chatDataPromise: Promise<any>; // Definerer en Promise-variabel for chatData

    async function generateImage() {
        generatedImageUrl = null;
        feedbackMessage = null;
        try {
            const response = await fetch('/api/image/generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: `${prompt}`,
                    n: 1,
                    size: `${width}x${height}`
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            generatedImageUrl = data.images[0];
            console.log('Generated Image URL:', generatedImageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
            feedbackMessage = 'Error generating image.';
        }
    }

    async function saveData() {
        feedbackMessage = null;
        try {
            const response = await fetch('/api/database/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: "4", // Sett riktig userID
                    name: "Dasi GPT",
                    email: "dasi@example.com",
                    imageUrl: generatedImageUrl || "default_image_url"
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            feedbackMessage = 'Data saved successfully.';
        } catch (error) {
            console.error('Error saving data:', error);
            feedbackMessage = 'Error saving data.';
        }
    }

    async function getID() {
        try {
            const response = await fetch('/api/database/user/get-id', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: "1459", // Sett riktig userID
                    method: "google"
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error getting data:', error);
        }
    }

    async function generateID() {
        try {
            const response = await fetch('/api/database/user/generate-id', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: "1459", // Sett riktig userID
                    method: "google"
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error getting data:', error);
        }
    }

    let chat = {
        "title": "Presidenten i USA er Joe Biden.",
        "messages": [
            {
                "sender": "user",
                "message": "hvem er presidenten i usa"
            },
            {
                "sender": "user",
                "message": "hvem"
            },
            {
                "sender": "bot",
                "message": "Per nå, per November 2021, er Joe Biden presidenten i USA."
            }
        ],
        "editTitle": true
    }

    let chatID = "1baebec1-cfe6-4e50-abae-97b3c4b6211a";

    async function saveChat() {
        try {
            const response = await fetch('/api/database/chat/save', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatID: chatID,
                    chat: chat
                })
            });
            const data = await response.json();
            console.log('API Response:', data);
        }
        catch (error) {
            console.error('Error saving chat:', error);
        }
    }

    async function getChat() {
        try {
            const response = await fetch('/api/database/chat/get', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: chatID
                })
            });
            const data = await response.json();
            console.log('API Response:', data);
            return data;
        }
        catch (error) {
            console.error('Error saving chat:', error);
        }
    }

    async function removeChat() {
        try {
            const response = await fetch('/api/database/chat/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatID: chatID
                })
            });
            const data = await response.json();
            console.log('API Response:', data);
        }
        catch (error) {
            console.error('Error deleting chat:', error);
        }
    }

    onMount(() => {
        chatDataPromise = getChat(); // Tildeler en Promise til chatDataPromise
    });
</script>

<div class="body">
    {#if !generatedImageUrl}
        <ImageMessage width={width} height={height} />
    {:else}
        <ImageMessage url={generatedImageUrl} alt={prompt} width={width} height={height} loading={false} />
    {/if}
</div>

<input type="text" bind:value={prompt} name="yuh" id="yuh">
<button class="button purple" on:click={generateImage}>Generate image</button>
<button class="button purple" on:click={saveData}>Save Data to Firebase</button>
<button class="button purple" on:click={getID}>Get ID</button>
<button class="button purple" on:click={generateID}>Generate</button>
<button class="button purple" on:click={saveChat}>Save Chat</button>
<button class="button purple" on:click={getChat}>Get Chat</button>
<button class="button purple" on:click={removeChat}>Delete Chat</button>

{#await chatDataPromise}
    <p>waiting</p>
{:then chatData}
    {JSON.stringify(chatData)}
{:catch error}
    <p>{error}</p>
{/await}

{#if feedbackMessage}
    <p>{feedbackMessage}</p>
{/if}

<style>
    * {
        color: var(--primary-text);
    }
    .body {
        margin-top: 200px;
        text-align: center; /* Sentrer innholdet horisontalt */
    }
</style>
