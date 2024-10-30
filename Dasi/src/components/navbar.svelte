<script>
    import { onMount } from 'svelte';
    import '/src/styles/global.css';

    let loggedIn = false;

    // Initialiserer variabler for å spore siste scroll-posisjon og synligheten til navbar
    let lastScrollTop = 0;
    let navbarVisible = true;

    // Funksjon for å sjekke brukerens scroll-retning
    const checkScroll = () => {
        // Henter nåværende scroll-posisjon
        let st = window.pageYOffset || document.documentElement.scrollTop;
        // Skjuler navbar hvis brukeren scroller nedover, viser den hvis oppover
        if (st > lastScrollTop){
            navbarVisible = false;
        } else {
            navbarVisible = true;
        }
        // Oppdaterer siste kjente scroll-posisjon, resetter til 0 hvis negativ
        lastScrollTop = st <= 0 ? 0 : st;
    };

    onMount(() => {
        // Legger til scroll-event listener hvis window-objektet er tilgjengelig
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', checkScroll);
        }

        // Fjerner event listener når komponenten demonteres
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', checkScroll);
            }
        };
    });

</script>
<div class="navbar" class:hide={!navbarVisible}>
    <div class="logo-container">
        <img src="/src/images/Dasi logo.png" alt="Home" class="logo" id="logo">
    </div>
    <div class="nav-links thin">
            <a href="/try-us" class="effect-underline">Try Us</a>
            <a href="/prices" class="effect-underline">Prices</a>
            <a href="/about" class="effect-underline">About Us</a>
        {#if loggedIn}
             <img src="https://placehold.co/400" alt="" class="profile-picture">
        {:else}
            <a href="/log-in" class="effect-underline">Log In</a>
        {/if}
        
    </div>
</div>

<style>
    /* Variables */
    :root {
        --nav-heigt: 80px;
        --text-size: 20px;
    }

    /*effect-underline*/
    a.effect-underline {
        position: relative;
        display: inline-block;
    }

    a.effect-underline:after {
        content: '';
        position: absolute;
        left: 0;
        display: inline-block;
        height: 1em;
        width: 100%;
        border-bottom: 1px solid;
        margin-top: 10px;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: scale(0,1);
        transform: scale(0,1);
    }

    a.effect-underline:hover:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    #logo {
        height: 90%;
    }

    .logo-container {
        display: flex;
        align-items: center;
        height: 100%;
    }
    

    .profile-picture {
        border-radius: 100%;
    }
    .navbar {
        transition: top 0.3s;
        position: fixed;
        height: var(--nav-heigt);
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        font-size: var(--text-size);
        color: #E0E0E0;
        background-color: #121212;
        z-index: 10000;
    }

    .navbar a {
        text-decoration: none;
        color: inherit;
    }

    .nav-links {
        display: flex;
        list-style: none;
        align-items: center;
        color: inherit;
    }

    .nav-links a {
        margin-right: 56px;
        text-decoration: none;
        color: inherit;
    }

    .navbar.hide {
        top: calc(-1 * var(--nav-heigt));
    }
</style>