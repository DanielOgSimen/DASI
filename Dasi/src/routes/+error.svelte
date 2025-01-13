<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>{$page.status} error</title>
</svelte:head>

<div class="bg">
    <h1 class="accent-blue xbold">{$page.status}</h1>
    <p>{$page.error.message}</p>
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
        font-size: 256px;
        color: var(--error);
    }

    .bg p {
        color: #CCCCCC;
        font-size: 100px;
    }

    .bg button {
        margin-top: 32px;
    }
</style>