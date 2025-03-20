<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let options = [
        {
            title: 'Share',
            icon: 'share-outline',
            style: 'var(--primary-text)',
            iconColor: 'var(--secondary-text)',
            action: 'share'
        },
        {
            title: 'Delete',
            icon: 'trash-outline',
            style: '#ff5252',
            iconColor: '#ff5252',
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
    <button class="exit" on:click={() => handleClick('exit')} aria-label="Exit">
        <ion-icon style="color: var(--secondary-text);" class="icon" name="close-outline"></ion-icon>
    </button>
    {#each options as { title, style, iconColor, icon, action }}
        <button class="edit-chat-option" on:click={() => handleClick(action)}>
            <ion-icon style="color:{iconColor};" class="icon" name="{icon}"></ion-icon>
            <p style="color: {style};" class="editText {action}">{title}</p>
        </button>
    {/each}
</div>

<style>
    .editText {
        font-size: 14px;
    }
    .icon {
        font-size: 20px;
    }
    .edit-chat {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 10px;
        z-index: 10000000000000;
        width: 150px;
        position: fixed;
        background-color: var(--secondary-border-divider);
    }

    .edit-chat-option {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        gap: 5px;
        align-items: center;
        margin: 4px 0;
        padding: 8px;
        width: 100%;
        text-align: left;
    }

    .edit-chat-option p {
        font-size: 16px;
        color: var(--primary-text);
        margin: 0;
    }

    .edit-chat-option:hover {
        background-color: var(--border-divider);
        border-radius: 10px;
    }

    .exit {
        align-self: flex-end;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-bottom: 10px;
    }
</style>