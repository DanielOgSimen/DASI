<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';

    // Props som sendes til komponenten
    export let title = "New Chat";
    export let editTitle;
    export let activeChat = false;
    export let currentChat: string;
    let newChat = false;
    
    if (currentChat === "New Chat") {
        editTitle = false;
        newChat = true;
    };

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
    let isSmallScreen = false;

    const checkScreenSize = () => {
        if (typeof window !== 'undefined') {
            isSmallScreen = window.innerWidth < 1050;
            console.log(isSmallScreen);
        }
    };

    function handleEdit() {
        dispatch('edit');
    }

    onMount(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    onDestroy(() => {
        window.removeEventListener('resize', checkScreenSize);
    });
</script>

<div class="chat-title" class:small={isSmallScreen}>
    <button class="chat-title-title" on:click={handleClick}>
        {#if editTitle}
            <input type="text" bind:value={localTitle} on:input={handleTitleChange} />
        {:else}
            <p class="regular">{title}</p>
        {/if}
    </button>
    {#if !newChat}
        <button class="chat-title-edit" class:show={activeChat} on:click={handleEdit}><svg fill="#B0B0B0" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.055 32.055" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path> </g> </g></svg></button>
    {/if}
</div>

<style>
    .chat-title-edit {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        width: 15%;
        opacity: 0;
        transition: opacity 0.3s ease;
        position: absolute;
        right: 5%;
    }

    .chat-title-edit.show {
        opacity: 1;
    }

    .chat-title:hover .chat-title-edit {
        opacity: 1;
    }

    .chat-title-title {
        width: 90%;
        height: 100%;
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: width 0.3s ease; /* Legg til overgang her */
    }

    .chat-title:hover .chat-title-title {
        width: 70%; /* Sett ønsket bredde ved hover */
    }

    .chat-title-edit svg {
        width: 30px;
        height: 30px;
    }
    

    .chat-title {
        width: 16vw;
        height: 70px;
        background-color: var(--secondary-border-divider);
        border-radius: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        position: relative;
    }

    .chat-title.small {
        width: 200px;
        height: 70px;
    }

    .chat-title:hover {
        cursor: pointer;
    }

    p, input {
        font-size: 25px;
        color: var(--secondary-text);
        background-color: transparent;
        border: none;
        text-align: center;
        outline: none;
        text-overflow: ellipsis;
        width: 100%;
    }

    .regular {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>