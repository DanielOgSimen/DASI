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

    // Opprett en typed event dispatcher
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
    {#each options as { title, icon, action }}
        <button class="edit-chat-option" on:click={() => handleClick(action)}>
            <img src={`/Images/icons/${icon}.svg`} alt={title} />
            <p>{title}</p>
        </button>
    {/each}
    <button class="exit" on:click={() => handleClick('exit')}>
        <img src="/Images/icons/cross.svg" alt="X" />
    </button>
</div>

<style>
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 4px;
        padding: 12px;
    }

    img {
        object-fit: contain;
        height: 40px;
    }

    button:hover {
        background-color: #2C2C2C;
        border-radius: 20px;
        transition: .3s;
    }

    .edit-chat {
        display: flex;
        flex-direction: column;
        background-color: var(--border-divider);
        border-radius: 26px;
        padding: 10px;
        z-index: 1;
        width: 260px;
        position: relative;
    }
    
    .edit-chat p {
        font-size: 26px;
        color: var(--primary-text);
        margin-left: 20px;
    }

    .exit {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>