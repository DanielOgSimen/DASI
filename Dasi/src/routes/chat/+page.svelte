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
                    "message": "Hello, how do i make an algorithm?"
                },
                {
                    "sender": "bot",
                    "message": "To create an algorithm, start by clearly defining the problem and identifying its goal and constraints. Break down the problem into smaller parts, then choose an approach, like brute force, greedy, or divide and conquer. Write out the steps in pseudocode, optimizing for efficiency by reducing unnecessary work or using efficient data structures. Translate the pseudocode into actual code in your chosen language and test it on a range of inputs, including edge cases. Refine the algorithm as needed to ensure it meets both the goal and constraints effectively."
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

    let inputPromtComponent;

    function findPrompt() {
        return inputPromtComponent.getPrompt();
    }

    async function handlePrompt() {
        // Hent prompten fra input-feltet ved å kalle findPrompt-funksjonen
        let prompt = findPrompt();
    
        // Sjekk om det finnes en gjeldende chat og at den er definert i chats-objektet
        if (currentChat && chats[currentChat]) {
            // Oppdater chats-objektet med den nye meldingen fra brukeren
            chats = {
                ...chats, // Behold eksisterende chats
                [currentChat]: {
                    ...chats[currentChat], // Behold eksisterende data for gjeldende chat
                    messages: [
                        ...chats[currentChat].messages, // Behold eksisterende meldinger
                        {
                            sender: "user", // Legg til ny melding fra brukeren
                            message: prompt
                        }
                    ]
                }
            };

            // Send brukerens melding til API-et og få svaret
            try {
                const formData = new FormData();
                formData.append('prompt', prompt);

                const response = await fetch('/api', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                // Oppdater chats-objektet med svaret fra API-et
                chats = {
                    ...chats, // Behold eksisterende chats
                    [currentChat]: {
                        ...chats[currentChat], // Behold eksisterende data for gjeldende chat
                        messages: [
                            ...chats[currentChat].messages, // Behold eksisterende meldinger
                            {
                                sender: "bot", // Legg til ny melding fra boten
                                message: data.message
                            }
                        ]
                    }
                };
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
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
    
</style>