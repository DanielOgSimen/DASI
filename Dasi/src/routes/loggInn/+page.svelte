<svelte:head>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="684634493497-2ena2p1qdk7jcfe1ef1hr2b8r3d8ip3r.apps.googleusercontent.com">
</svelte:head>
<script lang="ts">
    import Navbar from "../../components/navbar.svelte";

    import { onMount } from 'svelte';

    function onSignIn(googleUser: gapi.auth2.GoogleUser) {
        const profile = googleUser.getBasicProfile();
        const userDetails = {
            id: profile.getId(),
            name: profile.getName(),
            imageUrl: profile.getImageUrl(),
            email: profile.getEmail()
        };
        console.log(userDetails);
    }

    function signOut(event: Event) {
        event.preventDefault();
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log('User signed out.');
        });
    }

    onMount(() => {
        window.gapi.signin2.render('google-signin-button', {
            scope: 'profile email',
            width: 200,
            height: 35,
            longtitle: true,
            theme: 'light',
            onsuccess: onSignIn
        });
    });
</script>
<Navbar />
<div class="contentSignIn">
    <div class="signIn">
        <img class="LoggInLogo" src="src/Images/Dasi logo.png" alt="LogInnLogo">
        <p class="normal" style="color: #E0E0E0; font-size:14px;">Sign inn to get the full experience of DASI-gpt</p>
        <div id="google-signin-button" class="g-signin2" data-onsuccess="onSignIn"></div>
<!--         <a href="../" on:click={signOut}>Sign out</a> -->
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
        background-color: #1A1A1A;
    }
    .signIn {
        padding: 100px 25px;
        background-color:#242424 ;
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>