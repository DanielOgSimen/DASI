<script lang="ts">
    import { marked } from "marked";

    interface Props {
        message?: string;
        messenger?: string;
    }

    let { message = "Message not found", messenger = "Unknown" }: Props = $props();

    // Konverter meldingen til HTML ved hjelp av marked
    let formattedMessage = $derived(marked(message));
</script>

{#if messenger === "user"}
    <div class="message">
        <p>{message}</p>
    </div>
{:else}
    <div class="bot">
        <img src="/Images/Dasi logo.png" alt="" id="bot-logo">
        <p style="white-space: pre-wrap;">{@html formattedMessage}</p>
    </div>
{/if}

<style>
    .message {
        max-width: 300px;
        height: fit-content;
        background-color: var(--secondary-border-divider);
        color: var(--primary-text);
        border-radius: 20px;
        padding: 10px 16px;
    }

    .bot {
        max-width: 900px;
        height: fit-content;
        color: var(--primary-text);
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