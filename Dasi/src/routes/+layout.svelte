<script lang="ts">
    import { page } from "$app/stores";
    import Navbar from "../components/navbar.svelte";
    import "/src/styles/global.css";
    import ToTopButton from "../components/toTopButton.svelte";
    import Coockies from "../components/coockies/coockies.svelte";
    import Footer from "../components/footer.svelte";

    interface Props {
        children?: import('svelte').Snippet;
    }
    

    let { children }: Props = $props();
</script>

<div class="layout">
    <Navbar />
    {#if $page.url.pathname !== '/chat'}
        <ToTopButton />
    {/if}
    <Coockies />
    <main class="content">
        {@render children?.()}
    </main>
    {#if $page.url.pathname !== '/chat'}
        <Footer />
    {/if}
</div>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .content {
        flex: 1;
    }
</style>