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
    let dispatch = createEventDispatcher();

    function handleClick(action:string) {
        dispatch(action);
    }

</script>

<div class="edit-chat">
    {#each options as option}
        <button class="edit-chat-option" on:click={() => handleClick(option.action)}>
            <img src="/src/Images/icons/{option.icon}.svg" alt="{option.title}" />
            <p>{option.title}</p>
        </button>
    {/each}
    <button class="exit" on:click={() => handleClick('exit')}>
        <img src="/src/Images/icons/cross.svg" alt="X" />
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