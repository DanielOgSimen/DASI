<script>
    import Navbar from "../components/navbar.svelte";
    import "/src/styles/global.css";
    import ToTopButton from "../components/toTopButton.svelte";
</script>

<Navbar />
<ToTopButton />
<slot/>