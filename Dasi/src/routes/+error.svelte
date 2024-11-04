<script>
   export let error = { message: "Page not found" }; // fallback-verdi
   export let status = 404; // fallback-status
</script>

<svelte:head>
    <title>{status} error, {error.message}</title>
</svelte:head>

<div class="bg">
<h1 class="accent-blue xbold">{status}</h1>
<p>{error.message}</p>
<a href="/"><button class="purple-button">Go back to Home</button></a>
</div>

<style>
    .bg {
        background-color: #242424;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 32px;
    }

    .bg h1 {
        font-size: 256px;
    }

    .bg p {
        color: #CCCCCC;
        font-size: 100px;
    }

    .bg button {
        margin-top: 32px;
    }
</style>