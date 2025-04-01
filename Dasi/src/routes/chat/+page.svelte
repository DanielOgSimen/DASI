<script>
    // @ts-nocheck
    import { onMount, afterUpdate, tick, onDestroy } from 'svelte';
    import { get } from 'svelte/store';
    import {v4 as uuidv4} from 'uuid';
    import { chatStore } from '../../store/chatStore'; // Importer chatStore
    import { user } from '../../store/userStore'; // Importer userStore
    import ChatTitle from './../../components/chat/chat-title.svelte';
    import InputPromt from '../../components/input-promt.svelte';
    import Message from '../../components/chat/message.svelte';
    import '../../scripts/Prism.js'
    import '../../styles/Prism.css'
    import 'prismjs/themes/prism-tomorrow.css'; // Importer ønsket tema

    let currentChat = "New Chat";
    let waitigForResponse = false;
    let isChecked = false;
    let isLoggedIn = false;

    // Les data fra store
    let chats;
    chatStore.subscribe(value => {
        chats = value;
        console.log(chats);
    });

    user.subscribe(value => {
        isLoggedIn = !!value.id; // Sjekk om brukeren er logget inn basert på om id er satt
    });

    // Funksjon for å oppdatere store
    function updateStore(updatedChats) {
        chatStore.set(updatedChats);
    }

    function setCurrentChat(chat) {
        currentChat = chat;
        chats[chat].editTitle = true;
        console.log(currentChat)
        updateStore(chats);
        isChecked = false; // Fjern checked status når en chat-title blir trykket
        tick().then(() => {
            Prism.highlightAll();
        });
    }

    function updateChatTitle(chat, newTitle) {
        chats[chat].title = newTitle;
        updateStore(chats);
        tick().then(() => {
            Prism.highlightAll();
        });
    }

    let inputPromtComponent;

    function findPrompt() {
        return inputPromtComponent.getPrompt();
    }

    async function handlePrompt(noFindPrompt = false) {
        if (!isLoggedIn) {
            alert("You need to be logged in to chat");
            return;
        };
    
        let prompt = noFindPrompt ? "" : findPrompt();
    
        if (currentChat === "New Chat") {
            try {
                const response = await fetch('/api/title', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: prompt })
                });
    
                const data = await response.json();
                const newChatTitle = data.title || `Chat ${Object.keys(chats).length + 1}`;
                let chatID = uuidv4();
                currentChat = chatID;
                console.log(newChatTitle, chatID);
                chats[chatID] = {
                    title: newChatTitle,
                    messages: [],
                    editTitle: false
                };
            } catch (error) {
                console.error('Error fetching title from API:', error);
                return;
            }
        }
    
        if (currentChat && chats[currentChat]) {
            if (!noFindPrompt) {
                chats = {
                    ...chats,
                    [currentChat]: {
                        ...chats[currentChat],
                        messages: [
                            ...chats[currentChat].messages,
                            {
                                sender: "user",
                                message: prompt
                            }
                        ]
                    }
                };
            }
    
            const messages = chats[currentChat].messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.message
            }));
    
            try {
                waitigForResponse = true;
                const response = await fetch('/api/text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ messages, model: "gpt-3.5-turbo" })
                });
    
                const data = await response.json();
                waitigForResponse = false;
    
                chats = {
                    ...chats,
                    [currentChat]: {
                        ...chats[currentChat],
                        messages: [
                            ...chats[currentChat].messages,
                            {
                                sender: "bot",
                                message: data.message
                            }
                        ]
                    }
                };
    
                // Oppdater store
                updateStore(chats);
                await tick();
                Prism.highlightAll();
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
    }

    // Finner skjermlengden
    let isSmallScreen = false;

    const checkScreenSize = () => {
        if (typeof window !== 'undefined') {
            isSmallScreen = window.innerWidth < 1050;
        }
    };

    onMount(async () => {
        console.log("onMount triggered");
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkScreenSize);
            checkScreenSize();
            const urlParams = new URLSearchParams(window.location.search);
            const message = urlParams.get('message');
            const chat = urlParams.get('chat');
    
            /* Hvis du vil på chat 12, så er det ?chat=Chat%2012 */
            if (chat) {
                console.log("Setting current chat:", chat);
                setCurrentChat(chat);
            }
    
            if (message) {
                try {
                    console.log("Fetching title for message:", message);
                    const response = await fetch('/api/title', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: message })
                    });
    
                    const data = await response.json();
                    const newChatTitle = data.title || `Chat ${Object.keys(chats).length + 1}`;
                    let chatID = uuidv4();
                    currentChat = chatID;
                    chats[chatID] = {
                        title: newChatTitle,
                        messages: [
                            {
                                sender: "user",
                                message: message
                            }
                        ],
                        editTitle: false
                    };
    
                    updateStore(chats);
                    await handlePrompt(true);
                    await tick();
                    window.location = window.location.origin + window.location.pathname + `?chat=${chatID}`;
                } catch (error) {
                    console.error('Error fetching title from API:', error);
                }
            }
            await tick();
            Prism.highlightAll();
            return () => {
                window.removeEventListener('resize', checkScreenSize);
            };
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkScreenSize);
        }
    });

    afterUpdate(async () => {
        await tick();
        Prism.highlightAll();
    });
</script>

<svelte:head>
    <title>{chats[currentChat]?.title || "New Chat"} | DasiGPT</title>
</svelte:head>

<div class="chat-page">
    <div class="chat-titles" class:checked={isChecked}>
        <input type="checkbox" id="toggle" bind:checked={isChecked} />
        <label for="toggle" class="arrow chaticons"><img src="Images/icons/sidebar.svg" id="chats-icon" alt="<"></label>
    </div>
    {#if isChecked}
    <div class="newchatIcon">
        <input type="checkbox" />
        <label for="" class="newChatIcon chaticons"><ion-icon name="create-outline"></ion-icon></label>
    </div>  
    {/if}
    <div class="chats rm-scrollbar" class:checked={isChecked}>

        {#each Object.keys(chats) as chat, index}
            {#if chat === currentChat}
                <ChatTitle editTitle={true} currentChat={currentChat} title={chats[chat].title} activeChat={true} on:titleChange={(e) => updateChatTitle(chat, e.detail)} />
            {:else}
                <ChatTitle editTitle={false} title={chats[chat].title} on:click={() => setCurrentChat(chat)} />
            {/if}
        {/each}
    </div>
    <div class="chat-space rm-scrollbar" key={currentChat}>
        {#if currentChat === "New Chat"}
            <div class="new-chat">
                {#if isSmallScreen}
                    <InputPromt labelClass="noLabelAnimation" bind:this={inputPromtComponent} Width={"90vw"} onEnter={handlePrompt}/>
                {:else}
                    <InputPromt labelClass="noLabelAnimation" bind:this={inputPromtComponent} Width={"35rem"} onEnter={handlePrompt}/>
                {/if}
                <button class="button purple" on:click={handlePrompt}>Send Message</button>
            </div>
        {:else}
            <div class="normal-chat rm-scrollbar">
                <div class="normal-chats rm-scrollbar">
                    {#each chats[currentChat].messages as message, index}
                            {#if message.sender === "user"}
                                <div class="user-sent">
                                    <Message message={message.message} messenger={message.sender} smallScreen={isSmallScreen}/>
                                </div>
                            {:else}
                                <div class="bot-sent">
                                    <Message message={message.message} messenger={message.sender} smallScreen={isSmallScreen}/>
                                </div>
                            {/if}
                    {/each}
                    {#if waitigForResponse}
                        <div class="dot-pulse"></div>
                    {/if}
                </div>
                {#if isSmallScreen}
                    <InputPromt labelClass="noLabelAnimation" bind:this={inputPromtComponent} Width={"90vw"} onEnter={handlePrompt}/>
                {:else}
                    <InputPromt labelClass="noLabelAnimation" bind:this={inputPromtComponent} Width={"35rem"} onEnter={handlePrompt}/>
                {/if}
            </div>
        {/if}
    </div>
</div>
<style>
    #chats-icon {
        height: 35px;
    }
    .chaticons {
        padding: 5px;
    }
    .chaticons:hover {
        background-color: var(--background);
        border-radius: 5px;
    }
    :root {
        --chat-width: 20vw;
        --responsive-chat-width: 230px;
    }

    input[type="checkbox"] {
        display: none;
    }

    .newChatIcon {
        position: absolute;
        left: calc(-1 * var(--chat-width));
        top: 100px;
        z-index: 10000;
        left: 160px;
        font-size: 30px;
        cursor: pointer;
        color: var(--secondary-text);
        transition: transform 0.5s ease;
        
    }
    .arrow {
        position: absolute;
        top: 100px;
        z-index: 10000;
        left: 35px;
        font-size: 30px;
        cursor: pointer;
        color: var(--secondary-text);
        transition: transform 0.5s ease;
    }

    .chat-page {
        background-color: var(--background);
        display: flex;
        height: 100vh; /* Sørg for at chat-page fyller hele høyden */
    }

    .chats {
        position: absolute;
        width: var(--chat-width);
        max-width: 230px;
        height: 100%; /* Sørg for at chat-titlene fyller hele høyden */
        background-color: var(--border-divider);
        padding-top: 180px;
        overflow-y: auto; /* Aktiver skrolling når nødvendig */
        left: calc(-1 * var(--chat-width));
        display: flex; /* Endret fra grid til flex */
        flex-direction: column; /* Plasser elementene i en kolonne */
        align-items: center; /* Sentrer elementene horisontalt */
        justify-content: flex-start; /* Plasser elementene til starten av containeren */
        transition: left 0.5s ease;
    }
    .chats.checked {
            left: 0;
    }

    @media (max-width: 1050px) {
        .chat-titles {
            display: block;
            padding: 10px 15px;
            border-radius: 0 0 26px 2px;
            color: white;
            display: flex;
            align-items: center;
            visibility: visible;
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 0.5s ease;
        }
        .arrow {
            top: 35px;
        }
        .newChatIcon {
            top: 35px;
        }

        .chats {
            position: absolute;
            top: 0;
            left: calc(-1 * var(--responsive-chat-width));
            width: var(--responsive-chat-width);
            z-index: 100;
            transition: left 0.5s ease;
            display: flex; /* Endret fra grid til flex */
            flex-direction: column; /* Plasser elementene i en kolonne */
            align-items: center; /* Sentrer elementene horisontalt */
            justify-content: flex-start; /* Plasser elementene til starten av containeren */
        }

        .chats.checked {
            left: 0;
        }

        .chat-space {
            width: 100vw;
            padding-top: 0;
        }

        .chat-space {
            width: 100% !important;
            height: 100vh;
            padding-top: 100px;
            overflow-y: scroll;
        }
    }

    .chat-space {
        width: 100%;
        height: 100vh;
        padding-top: 100px;
        overflow-y: scroll;
    }

    .new-chat {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .normal-chat {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
        padding: 0 20px;
        padding-bottom: 40px;
    }

    .normal-chats {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .user-sent {
        align-self: flex-end;
        color: white;
        padding: 10px;
        border-radius: 10px;
        margin-right: 10px;
        width: fit-content;
    }

    .bot-sent {
        align-self: flex-start;
        color: black;
        padding: 10px;
        border-radius: 10px;
        margin-left: 10px;
        width: fit-content;
    }

    .dot-pulse {
        position: relative;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: var(--accent);
        color: var(--accent);
        animation: dot-pulse 1.5s infinite linear;
        animation-delay: 0.25s;
    }

    .dot-pulse::before, .dot-pulse::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: var(--accent);
        color: var(--accent);
    }

    .dot-pulse::before {
        left: -15px;
        animation: dot-pulse-before 1.5s infinite linear;
        animation-delay: 0s;
    }

    .dot-pulse::after {
        left: 15px;
        animation: dot-pulse-after 1.5s infinite linear;
        animation-delay: 0.5s;
    }

    @keyframes dot-pulse-before {
        0% {
            transform: scale(1);
        }
        30% {
            transform: scale(1.5);
        }
        60%, 100% {
            transform: scale(1);
        }
    }

    @keyframes dot-pulse {
        0% {
            transform: scale(1);
        }
        30% {
            transform: scale(1.5);
        }
        60%, 100% {
            transform: scale(1);
        }
    }

    @keyframes dot-pulse-after {
        0% {
            transform: scale(1);
        }
        30% {
            transform: scale(1.5);
        }
        60%, 100% {
            transform: scale(1);
        }
    }
</style>