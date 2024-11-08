<script lang="ts">
    import InputPromt from "../../components/input-promt.svelte";

    let inputPromtComponent: typeof InputPromt;

    function findPrompt() {
        console.log(inputPromtComponent.getPrompt());
    }
</script>

<InputPromt bind:this={inputPromtComponent} />

<button on:click={findPrompt}>Sjekker</button>