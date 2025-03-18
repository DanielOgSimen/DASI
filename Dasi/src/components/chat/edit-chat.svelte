<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let options = [
        {
            title: 'Share',
            icon: 'share',
            action: 'share'
        },
        {
            title: 'Delete',
            icon: 'trash',
            action: 'delete'
        },
    ];

    // Create a typed event dispatcher
    const dispatch = createEventDispatcher<{
        share: never;
        delete: never;
        exit: never;
    }>();

    function handleClick(action: 'share' | 'delete' | 'exit') {
        dispatch(action);
    }
</script>

<div class="edit-chat">
    <button class="exit" on:click={() => handleClick('exit')}>
        <img src="/Images/icons/cross.svg" alt="X" />
    </button>
    {#each options as { title, icon, action }}
        <button class="edit-chat-option" on:click={() => handleClick(action)}>
            <img src={`/Images/icons/${icon}.svg`} alt={title} />
            <p>{title}</p>
        </button>
    {/each}
</div>

<style>
    .edit-chat {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 10px;
        z-index: 1000;
        width: 100px;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .edit-chat-option {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 4px 0;
        padding: 8px;
        width: 100%;
        text-align: left;
    }

    .edit-chat-option img {
        object-fit: contain;
        height: 24px;
        margin-right: 10px;
    }

    .edit-chat-option p {
        font-size: 16px;
        color: var(--primary-text);
        margin: 0;
    }

    .edit-chat-option:hover {
        background-color: #2C2C2C;
        border-radius: 10px;
        transition: background-color 0.3s;
    }

    .exit {
        align-self: flex-end;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .exit img {
        height: 20px;
    }
</style>