<svelte:head>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="684634493497-2ena2p1qdk7jcfe1ef1hr2b8r3d8ip3r.apps.googleusercontent.com">
    <script src="https://accounts.google.com/gsi/client" async defer></script> 
</svelte:head>
<script module lang="ts">
    declare const google: any;
</script>
<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        // Last inn GIS-biblioteket
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialiser GIS
            google.accounts.id.initialize({
                client_id: '684634493497-2ena2p1qdk7jcfe1ef1hr2b8r3d8ip3r.apps.googleusercontent.com', // Erstatt med din klient-ID
                callback: onSignIn,
            });
            renderButton();
        };
    });
    function renderButton(){
        // Opprett en Sign-In-knapp
        google.accounts.id.renderButton(
            document.getElementById('signIn'), // Elementet hvor knappen skal vises
            { theme: 'outline', size: 'large' }  // Tilpasningsalternativer
        );
    }
    // Callback-funksjonen som kjøres etter vellykket innlogging
    import { user } from "../../store/userStore";
    // @ts-ignore
    function onSignIn(response) {
        const id_token = response.credential;
        // Dekoder fra Base64Url til en UTF-8 streng
        const base64UrlPayload = id_token.split('.')[1];
        const base64Payload = base64UrlPayload.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(decodeURIComponent(atob(base64Payload).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));

        // Oppdaterer Svelte store med brukerinformasjon ved logg in 
        user.set({
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        });
        console.log('Logged in as: ' + payload.name);
    }
     // Funksjon for å logge ut av Google-kontoen
     function signOut(event: Event) {
        event.preventDefault();
        google.accounts.id.disableAutoSelect();
        user.set({
            id: null,
            name: null,
            email: null,
            picture: null
        });
        location.reload();
        console.log('User signed out.');
    }
</script>
<div class="contentSignIn">
    <div class="signIn">
        <img class="LoggInLogo" src="/Images/Dasi logo.png" alt="LogInnLogo">
        {#if !$user.id}
            <p class="normal" style="color: var(--primary-text); font-size:14px;">Sign inn to get the full experience of DASI-gpt</p>
            <div id="signIn"></div>
        {:else}
            <p class="normal" style="color: var(--primary-text); font-size:14px;">Sign out of DASI-gpt</p>
            <a class="button error" onclick={signOut} href="../">Sign out</a>
        {/if}
         
    </div>
</div>


<style>
    .LoggInLogo {
        width: 100px;
        height: 100px;
    }

    .contentSignIn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--border-divider);
    }
    .signIn {
        padding: 8rem 7rem;
        background-color: var(--secondary-border-divider);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>