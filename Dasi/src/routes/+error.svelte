<script>
    import { page } from '$app/stores';

    let errors = {
        404: {
            message: 'You\'re lost, go back to the homepage'
        },
        500: {
            message: 'Something went wrong, It\'s not you, it\'s us'
        }
    }
</script>

<svelte:head>
    <title>{$page.status} error</title>
</svelte:head>

<div class="bg">
    <h1 class="accent-blue xbold">{$page.status}</h1>
    {#if errors[$page.status]}
        <p>{errors[$page.status].message}</p>
    {:else}
        <p>{$page.error.message}</p>
    {/if}
    <a href="/"><button class="error button">Go back to Home</button></a>
</div>

<style>
    .bg {
        background-color: var(--background);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 32px;
    }

    .bg h1 {
        font-size: clamp(2rem, 20vw, 25rem);
        color: var(--error);
    }

    .bg p {
        color: #CCCCCC;
        font-size: clamp(1rem, 5vw, 20rem);
    }

    .bg button {
        margin-top: 32px;
    }
</style>