<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let { icon, text, selected = false, group } = $props();

    function handleChange() {
        dispatch('change', text);
    }
</script>

<label class="choice" class:selected={selected}>
    <input 
        type="radio" 
        name={group} 
        value={text} 
        checked={selected}
        on:change={handleChange} 
    />
    {#if icon}
        <span class="icon">{@html icon}</span>
    {/if}
    <span class="text">{text}</span>
</label>

<style>
    .choice {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--background);
        margin: 0.5rem 0;
        cursor: pointer;
        gap: 1rem;
        margin-bottom: -15px;
        border: none;
        transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
    }

    input[type="radio"] {
        display: none;
    }

    .choice:hover {
        background-color: var(--secondary-border-divider);
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .choice.selected {
        background-color: var(--accent-color) !important;
        border: 2px solid var(--accent-color);
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all .3s;
    }

    .choice.selected .text {
        color: white;
        transition: all .3s;
    }

    :global(.icon svg) {
        stroke: var(--accent);
        fill: var(--accent);
        display: flex;
        width: 16px;
        height: 16px;
        font-size: 1.2em;
        transition: all .3s;
    }
</style>