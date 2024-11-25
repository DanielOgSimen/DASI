<script>
    import Navbar from '../components/navbar.svelte';
    import CtaButton from '../components/cta-button.svelte';
    import Splash from '../boxes/splash.svelte';
    import ScrollSelection from '../boxes/scrollSection.svelte';
</script>

<svelte:head>
    <title>Dasi-GPT | Home</title>
</svelte:head>

<Navbar/>
<Splash/>
<ScrollSelection/>
<div class="g-signin2" data-onsuccess="onSignIn"></div>