<script lang="ts">
    import Navbar from "../components/navbar.svelte";
    import "/src/styles/global.css";
    import ToTopButton from "../components/toTopButton.svelte";
    import Coockies from "../components/coockies/coockies.svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<Navbar />
<ToTopButton />
<Coockies/>
{@render children?.()}