<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { chatStore } from '../../store/chatStore'; // Importer chatStore
    import ChatTitle from './../../components/chat/chat-title.svelte';
    import Navbar from "../../components/navbar.svelte";
    import InputPromt from '../../components/input-promt.svelte';
    import Message from '../../components/chat/message.svelte';

    let currentChat = "New Chat";
    let waitigForResponse = false;

    // Les data fra store
    let chats;
    chatStore.subscribe(value => {
        chats = value;
    });

    // Funksjon for å oppdatere store
    function updateStore(updatedChats) {
        chatStore.set(updatedChats);
    }

    function setCurrentChat(chat) {
        currentChat = chat;
        chats[chat].editTitle = true;
        updateStore(chats);
    }

    function updateChatTitle(chat, newTitle) {
        chats[chat].title = newTitle;
        updateStore(chats);
    }

    let inputPromtComponent;

    function findPrompt() {
        return inputPromtComponent.getPrompt();
    }

    async function handlePrompt() {
        let prompt = findPrompt();
        if (currentChat === "New Chat") {
            const newChatTitle = `Chat ${Object.keys(chats).length + 1}`;
            currentChat = newChatTitle;
            chats[newChatTitle] = {
                title: newChatTitle,
                messages: [],
                editTitle: false
            };
        }

        if (currentChat && chats[currentChat]) {
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

            const messages = chats[currentChat].messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.message
            }));

            messages.push({ role: "user", content: prompt });

            try {
                waitigForResponse = true;
                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ messages })
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
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');

        if (message) {
            const newChatTitle = `Chat ${Object.keys(chats).length + 1}`;
            currentChat = newChatTitle;
            chats[newChatTitle] = {
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
            handlePrompt();
        }
    });
</script>

<Navbar />
<div class="chat-page">
    <div class="chats">
        {#each Object.keys(chats) as chat, index}
            {#if chat === currentChat}
                <ChatTitle editTitle={true} title={chats[chat].title} on:titleChange={(e) => updateChatTitle(chat, e.detail)} />
            {:else}
                <ChatTitle editTitle={false} title={chats[chat].title} on:click={() => setCurrentChat(chat)} />
            {/if}
        {/each}
    </div>
    <div class="chat-space">
        {#if currentChat === "New Chat"}
            <div class="new-chat">
                <InputPromt bind:this={inputPromtComponent} Width={"35rem"} onEnter={handlePrompt}/>
                <button class="button purple" on:click={handlePrompt}>Send Message</button>
            </div>
        {:else}
            <div class="normal-chat">
                <div class="normal-chats">
                    {#each chats[currentChat].messages as message}
                            {#if message.sender === "user"}
                                <div class="user-sent">
                                    <Message message={message.message} messenger={message.sender}/>
                                </div>
                            {:else}
                                <div class="bot-sent">
                                    <Message message={message.message} messenger={message.sender}/>
                                </div>
                            {/if}
                    {/each}
                    {#if waitigForResponse}
                        <div class="dot-pulse">Laget av Daniel og Simen</div>
                    {/if}
                </div>
                <InputPromt bind:this={inputPromtComponent} Width={"35rem"} onEnter={handlePrompt}/>
            </div>
        {/if}
    </div>
</div>

<style>
    :root {
        --chat-width: 366px;
    }
    .chat-page {
        background-color: #121212;
        display: flex;
    }
    .chats {
        width: var(--chat-width);
        height: 100vh;
        background-color: #1A1A1A;
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        overflow-y: scroll;
    }
    .chat-space {
        width: calc(100% - var(--chat-width));
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
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #00b8d4;
    color: #00b8d4;
    box-shadow: 9999px 0 0 -5px;
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
    background-color: #00b8d4;
    color: #00b8d4;
    }
    .dot-pulse::before {
    box-shadow: 9984px 0 0 -5px;
    animation: dot-pulse-before 1.5s infinite linear;
    animation-delay: 0s;
    }
    .dot-pulse::after {
    box-shadow: 10014px 0 0 -5px;
    animation: dot-pulse-after 1.5s infinite linear;
    animation-delay: 0.5s;
    }

    @keyframes dot-pulse-before {
    0% {
        box-shadow: 9984px 0 0 -5px;
    }
    30% {
        box-shadow: 9984px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 9984px 0 0 -5px;
    }
    }
    @keyframes dot-pulse {
    0% {
        box-shadow: 9999px 0 0 -5px;
    }
    30% {
        box-shadow: 9999px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 9999px 0 0 -5px;
    }
    }
    @keyframes dot-pulse-after {
    0% {
        box-shadow: 10014px 0 0 -5px;
    }
    30% {
        box-shadow: 10014px 0 0 2px;
    }
    60%, 100% {
        box-shadow: 10014px 0 0 -5px;
    }
    }
    
</style>