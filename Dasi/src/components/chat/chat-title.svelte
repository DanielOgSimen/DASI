<script lang="ts">
    import { run } from 'svelte/legacy';
    import EditChat from './edit-chat.svelte';
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';

    
    interface Props {
        // Props som sendes til komponenten
        title?: string;
        editTitle: any;
        activeChat?: boolean;
        currentChat: string;
    }

    let {
        title = "New Chat",
        editTitle = $bindable(),
        activeChat = false,
        currentChat
    }: Props = $props();
    let newChat = $state(false);
    
    if (currentChat === "New Chat") {
        editTitle = false;
        newChat = true;
    };

    // Opprett en event dispatcher
    const dispatch = createEventDispatcher();

    // Lokal variabel for å holde på tittelverdien
    let localTitle = $state(title);

    // Reaktivt utsagn for å oppdatere localTitle når editTitle er false
    run(() => {
        if (!editTitle) {
            localTitle = title;
        }
    });

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
    let isSmallScreen = $state(false);

    const checkScreenSize = () => {
        if (typeof window !== 'undefined') {
            isSmallScreen = window.innerWidth < 1050;
            console.log(isSmallScreen);
        }
    };

    let showEditChat = $state(false);
    function toggleEditChat() {
        showEditChat = !showEditChat;
        console.log(showEditChat);
    }

    function handleEdit(event:CustomEvent) {
        showEditChat = false;
        if (event.type != 'exit') {
            dispatch(event.type);
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });
</script>

<div class="chat-title" class:small={isSmallScreen}>
    <button class="chat-title-title" onclick={handleClick}>
        {#if editTitle}
            <input type="text" bind:value={localTitle} oninput={handleTitleChange} />
        {:else}
            <p class="regular">{title}</p>
        {/if}
    </button>
    {#if !newChat}
        <button class="chat-title-edit" class:show={activeChat} onclick={toggleEditChat} aria-label="Edit Chat"><svg fill="#B0B0B0" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.055 32.055" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path> </g> </g></svg></button>
        {#if showEditChat}
            <div class="editChat">
                <EditChat on:delete={handleEdit} on:share={handleEdit} on:exit={handleEdit}/>
            </div>
        {/if}
    {/if}
</div>

<style>
    #Capa_1 {
        height: 16px;

    }
    .chat-title {
        width: 200px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        display: flex;
        align-items: center;
        border: none;
        position: relative;
        transition: background-color 0.3s ease;
    }

    .chat-title:hover {
        background-color: var(--secondary-border-divider);
        cursor: pointer;
    }

    .chat-title-title {
        width: 90%;
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        transition: width 0.3s ease;
        height: 50px;
        cursor: pointer;
    }

    .chat-title-title:hover {
        cursor: pointer;
    }

    .chat-title-edit {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        width: 15%;
        opacity: 0;

        transition: opacity 0.3s ease;
        position: absolute;
        right: 2%;
    
    }

    .chat-title-edit.show {
        opacity: 1;
    }

    .chat-title:hover .chat-title-edit {
        opacity: 1;
    }

    .chat-title-edit svg {
        width: 30px;
        height: 30px;
    }

    .editChat {
        position: absolute;
        top: 40px;
        left: 80%;
        z-index: 100000000000;
        background-color: var(--background);
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    p {
        padding: 0 20px;
    }

    p, input {
        font-size: 15px;
        color: var(--secondary-text);
        background-color: transparent;
        border: none;
        outline: none;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    input {
        background-color: var(--background);
        height: 40px;
        width: 200px;
        border-radius: 5px;
        padding: 0 20px;

    }

    .regular {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        text-align: start;
    }
</style>