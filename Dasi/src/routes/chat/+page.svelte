<script>
// @ts-nocheck
    import ChatTitle from './../../components/chat/chat-title.svelte';
    import Navbar from "../../components/navbar.svelte";
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

    function setCurrentChat(chat) {
        currentChat = chat;
        chats[chat].editTitle = true;
        console.log(currentChat);
    }

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
</div>

<style>
    .chat-page {
        background-color: #121212;
    }
    .chats {
        width: 366px;
        height: 100vh;
        background-color: #1A1A1A;
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        overflow-y: scroll;
    }
</style>