<script>
    import { onMount } from 'svelte';
    import { user } from '../store/userStore';

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
    <a href="/">
        <div class="logo-container">
            <img src="/src/images/Dasi logo.png" alt="Home" class="logo" id="logo">
        </div>
    </a>
    <div class="nav-links thin">
            <a href="/chat" class="effect-underline">Chat</a>
            <a href="/try-us" class="effect-underline">Try Us</a>
            <a href="/prices" class="effect-underline">Prices</a>
            <a href="/about" class="effect-underline">About Us</a>
        {#if !$user.picture}
            <a href="/loggInn" class="effect-underline">Log In</a>
        {:else}
            <a href="/loggInn"><img src="{$user.picture}" alt="" class="profile-picture"></a>
        {/if}
        
    </div>
</div>

<style>
    /* Variables */
    :root {
        --nav-heigt: 80px;
        --text-size: 20px;
    }

    #logo {
        height: 90%;
    }

    .logo-container {
        display: flex;
        align-items: center;
        height: var(--nav-heigt);
    }
    

    .profile-picture {
        border-radius: 50%;
        height: 58px;
        padding: 5px;
        display: flex;
        background-color: #242424;
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