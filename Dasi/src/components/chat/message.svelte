<script>
    import { marked } from "marked";

    export let message = "Message not found";
    export let messenger = "Unknown";

    // Konverter meldingen til HTML ved hjelp av marked
    $: formattedMessage = marked(message);
</script>

{#if messenger === "user"}
    <div class="message">
        <p>{message}</p>
    </div>
{:else}
    <div class="bot">
        <img src="/src/Images/Dasi logo.png" alt="" id="bot-logo">
        <p style="white-space: pre-wrap;">{@html formattedMessage}</p>
    </div>
{/if}

<style>
    .message {
        max-width: 300px;
        height: fit-content;
        background-color: #242424;
        color: #E0E0E0;
        border-radius: 20px;
        padding: 10px 16px;
    }

    .bot {
        max-width: 900px;
        height: fit-content;
        color: #E0E0E0;
        border-radius: 20px;
        padding: 10px 16px;
        margin-left: auto;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    #bot-logo {
        height: 50px;
        object-fit: contain;
        margin-right: 10px;
    }
</style>