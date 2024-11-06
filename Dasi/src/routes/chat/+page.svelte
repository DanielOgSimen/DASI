<script>
// @ts-nocheck
    import ChatTitle from './../../components/chat/chat-title.svelte';
    import Navbar from "../../components/navbar.svelte";
    import InputPromt from '../../components/input-promt.svelte';
    import Message from '../../components/chat/message.svelte';

    let currentChat = "New Chat";
    let chats = {
        "New Chat": {
            "title": "New Chat",
            "messages": [],
            "editTitle": false
        },
        "chat1": {
            "title": "Chat 1",
            "messages": [
                {
                    "sender": "user",
                    "message": "Hello"
                },
                {
                    "sender": "bot",
                    "message": "Hi"
                }
            ],
            "editTitle": false
        },
        "chat2": {
            "title": "Chat 2",
            "messages": [
                {
                    "sender": "user",
                    "message": "Hello"
                },
                {
                    "sender": "bot",
                    "message": "Hi"
                }
            ],
            "editTitle": false
        }
    };

    // Funksjon for å sette gjeldende chat og aktivere redigering av tittelen
    function setCurrentChat(chat) {
        currentChat = chat;
        chats[chat].editTitle = true;
        console.log(currentChat);
    }

    // Funksjon for å oppdatere tittelen på en chat
    function updateChatTitle(chat, newTitle) {
        chats[chat].title = newTitle;
    }
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
                <InputPromt />
                <button class="button purple">Send Message</button>
            </div>
        {:else}
            <div class="normal-chat">
                {#each chats[currentChat].messages as message}
                        {#if message.sender === "user"}
                            <div class="user-sent">
                                <Message message={message.message}/>
                            </div>
                        {:else}
                            <div class="bot-sent">
                                <Message message={message.message}/>
                            </div>
                        {/if}
                {/each}
                <InputPromt />
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
    }

    .user-sent {
        align-self: flex-end;
        background-color: #007bff;
        color: white;
        padding: 10px;
        border-radius: 10px;
        margin-right: 10px;
        width: fit-content;
    }

    .bot-sent {
        align-self: flex-start;
        background-color: #e0e0e0;
        color: black;
        padding: 10px;
        border-radius: 10px;
        margin-left: 10px;
        width: fit-content;
    }
    
</style>