<script>
    import { createEventDispatcher } from 'svelte';

    // Props som sendes til komponenten
    export let title = "New Chat";
    export let editTitle;

    // Opprett en event dispatcher
    const dispatch = createEventDispatcher();

    // Lokal variabel for å holde på tittelverdien
    let localTitle = title;

    // Reaktivt utsagn for å oppdatere localTitle når editTitle er false
    $: if (!editTitle) {
        localTitle = title;
    }

    // Funksjon for å håndtere klikkhendelse og sende 'click'-hendelse
    function handleClick() {
        dispatch('click');
    }

    // Funksjon for å håndtere tittelendringshendelse og sende 'titleChange'-hendelse
    // @ts-ignore
    function handleTitleChange(event) {
        localTitle = event.target.value;
        dispatch('titleChange', localTitle);
    }
</script>

<button class="chat-title" on:click={handleClick}>
    {#if editTitle}
        <input type="text" bind:value={localTitle} on:input={handleTitleChange} />
    {:else}
        <p class="regular">{title}</p>
    {/if}
</button>

<style>
    .chat-title {
        width: 286px;
        height: 70px;
        background-color: #242424;
        border-radius: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }

    .chat-title:hover {
        cursor: pointer;
    }
    p, input {
        font-size: 25px;
        color: #B0B0B0;
        background-color: transparent;
        border: none;
        text-align: center;
        outline: none;
    }
</style>