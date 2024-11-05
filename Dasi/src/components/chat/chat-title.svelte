<script>
    import { createEventDispatcher } from 'svelte';
    export let title = "New Chat";
    export let editTitle;
    const dispatch = createEventDispatcher();
    let localTitle = title;

    $: if (!editTitle) {
        localTitle = title;
    }

    function handleClick() {
        dispatch('click');
    }

    // @ts-ignore
    function handleTitleChange(event) {
        localTitle = event.target.value;
        dispatch('titleChange', localTitle);
    }
</script>

<button class="chat-title" on:click={handleClick}>
    {#if editTitle}
        <input type="text" bind:value={localTitle} on:input={handleTitleChange} />
    {:else}
        <p class="regular">{title}</p>
    {/if}
</button>

<style>
    .chat-title {
        width: 286px;
        height: 70px;
        background-color: #242424;
        border-radius: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }

    .chat-title:hover {
        cursor: pointer;
    }
    p, input {
        font-size: 25px;
        color: #B0B0B0;
        background-color: transparent;
        border: none;
        text-align: center;
    }
</style>