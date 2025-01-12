<script lang="ts">
    import { onMount } from 'svelte';
    import { user } from '../store/userStore';

    // Initialiserer variabler for å spore siste scroll-posisjon og synligheten til navbar
    let lastScrollTop = 0;
    let navbarVisible = true;

    // Abonner på user-storen
    let userData: any;
    user.subscribe(value => {
        userData = value;
    });

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

    const links = [
        {name: 'Chat', href: '/chat'},
        {name: 'Try Us', href: '/try-us'},
        {name: 'Prices', href: '/Prices'},
        {name: 'About Us', href: '/about'},
        {name: `<ion-icon name="sunny-outline"></ion-icon>`, href: '', onclick: () => {changeThemeLocalStorage("light"); changeIcon("light");}},
        {name: '<ion-icon name="moon-outline"></ion-icon>', href: '', onclick: () => {changeThemeLocalStorage("dark"); changeIcon("dark");}}, 
    ];

    // Light mode and dark mode
    // oppdaterer temaet til light eller dark
    const changeIcon = (iconTheme: string) => {
        if (iconTheme === "dark") {
            /* links[5].name = '<ion-icon name="sunny-outline"></ion-icon>'; */
        } else if (iconTheme === "light") {
            /* links[4].name = '<ion-icon name="moon-outline"></ion-icon>'; */
        }
    }
    let theme;
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    let cleanup: () => void;
    // Funksjon for å oppdatere temaet
    const changeTheme = (newTheme: string) => {
        theme = newTheme;
        document.documentElement.setAttribute('data-theme', theme);
    }
    const changeThemeLocalStorage = (theme: string) => {
        localStorage.setItem('theme', theme);
        changeTheme(theme);
        if (cleanup) {
            cleanup();
        }
    }   

    if (storedTheme !== null) {
        changeTheme(storedTheme);
    } else {
         // Funksjon for å sette tema basert på enhetens preferanser
        const setInitialTheme = () => {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            changeTheme(theme);
        }

        // Event listener for å håndtere endringer i enhetens fargeskjema
        const handleColorSchemeChange = (e: MediaQueryListEvent) => {
            changeTheme(e.matches ? 'dark' : 'light');
        }

        onMount(() => {
            // Sett initialt tema basert på enhetens preferanser
            setInitialTheme();

            // Legg til event listener for å håndtere endringer i enhetens fargeskjema
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', handleColorSchemeChange);

            // Definerer oppryddingsfunksjonen
            cleanup = () => { 
                mediaQuery.removeEventListener('change', handleColorSchemeChange); // Fjerner event listener
                console.log('cleanup');
            };

            // Returner oppryddingsfunksjonen
            return cleanup; // verdien fra cleanup blir returnert fra onMount funksjonen. dette skjer først når komponenten blir demontert altså cleanup har en verdi å returnere  
        });
    }
</script>

<div class="navbar" class:hide={!navbarVisible}>
    <a href="/">
        <div class="logo-container">
            <img src="/src/images/Dasi logo.png" alt="Home" class="logo" id="logo">
        </div>
    </a>
    <div class="nav-links thin">
        {#each links as link}
            <a href={link.href} on:click={link.onclick} class="effect-underline">
                {@html link.name}
            </a>
            
        {/each}
        {#if !userData.picture}
            <a href="/loggInn" class="effect-underline">Log In</a>
        {:else}
            <a href="/loggInn"><img src={userData.picture} alt="ProfilePicture" class="profile-picture"></a>
        {/if}
    </div>
</div>

<nav class="menu--right">
    <div class="menuToggle">
        <input type="checkbox"/>
        <span></span>
        <span></span>
        <span></span>
        <ul class="menuItem">
            {#if !userData.picture}
                <li><a href="/loggInn" class="effect-underline">Log In</a></li>
            {:else}
                <li><a href="/loggInn"><img src={userData.picture} alt="ProfilePicture" class="profile-picture"></a></li>
            {/if}
            <li><a href="/" class="effect-underline">Home</a></li>
            {#each links as link}
                <li><a href={link.href} class="effect-underline">{link.name}</a></li>
            {/each}
        </ul>
    </div>
</nav>

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
        width: 58px;
        padding: 5px;
        display: flex;
        background-color: var(--secondary-border-divider);
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
        color: var(--primary-text);
        background-color: var(--background);
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

    .menu--right {
        display: none;
    }

    @media screen and (max-width: 1050px) {
        .navbar {
            display: none;
        }

        .menu--right {
            display: block;
            z-index: 100000;
        }
        .menuToggle {
            display: block;
            position: relative;
            top: 50px;
            z-index: 1;
            -webkit-user-select: none;
            user-select: none;
        }
        .menuToggle a {
            text-decoration: none;
            color: #232323;
            transition: all 0.3s ease;
        }
        .menuToggle input {
            display: block;
            width: 40px;
            height: 32px;
            position: absolute;
            top: -7px;
            cursor: pointer;
            opacity: 0;
            /* hide this */
            z-index: 2;
            /* and place it over the hamburger */
            -webkit-touch-callout: none;
        }
        .menuToggle span {
            position: relative;
            display: block;
            width: 33px;
            height: 4px;
            margin-bottom: 5px;
            position: relative;
            background: #cdcdcd;
            border-radius: 3px;
            z-index: 1;
            transform-origin: 4px 0px;
            transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
        }
        .menuToggle span:first-child {
            transform-origin: 0% 0%;
        }
        .menuToggle span:nth-last-child(2) {
            transform-origin: 0% 100%;
        }
        .menuToggle input:checked ~ span {
            opacity: 1;
            transform: rotate(45deg) translate(-2px, -1px);
            background: #232323;
        }
        .menuToggle input:checked ~ span:nth-last-child(3) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
        }
        .menuToggle input:checked ~ span:nth-last-child(2) {
            transform: rotate(-45deg) translate(0, -1px);
        }
        .menuToggle input:checked ~ .menuItem {
            transform: none;
        }
        .menuItem {
            position: absolute;
            width: 300px;
            padding: 50px;
            padding-top: 125px;
            background: #ededed;
            list-style-type: none;
            transform-origin: 0% 0%;
            transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
        }
        .menuItem li {
            padding: 10px 0;
            font-size: 22px;
        }
        .menu--right .menuToggle {
            position: fixed;
            right: 0;
        }
        .menu--right .menuToggle input {
            right: 50px;
        }
        .menu--right .menuToggle span {
            right: 50px;
        }
        .menu--right .menuItem {
            right: 0;
            margin: -100px 0 0 0;
            transform: translate(100%, 0);
        }
    }
</style>