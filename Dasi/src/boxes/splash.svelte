<script>
	import AiAssistant from './../components/ai-assistant.svelte';
    import CtaButton from "../components/cta-button.svelte";
	import { goto } from '$app/navigation';
</script>

<div class="splash">
    <div class="info">
        <AiAssistant />
        <h1 class="medium"><span class="accent-blue">DASI</span>-gpt
            <br>explore the <span class="accent-blue">future</span>
            <br>with your own assistant
        </h1>
        <p id="paragraph" class="regular">Welcome to our chatbot, your personal 
        assistant here to help you navigate our site, 
        answer your questions, and provide support 
        whenever you need it.</p>
        <div class="buttons">
            <CtaButton text="Get started"/>
            <button onclick={() => goto("/loggInn")} class="purple button regular">Log in</button>
        </div>
    </div>
    <div class="logo">
        <img src="/Images/Dasi logo.png" alt="DASI-gpt logo">
    </div>
</div>

<style>
    .splash {
        height: 100vh;
        width: 100vw;
        background-color: var(--background);
        color: var(--primary-text);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        /* flex-wrap: wrap; /* Legg til flex-wrap for å håndtere overflyt */
    }

    .splash h1 {
        font-size: 50px;
    }

    .info {
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        justify-content: space-around; /* Fjern dobbel justify-content */
        padding-left: 5%;
        box-sizing: border-box; /* Sørg for at padding ikke påvirker bredden */
    }

    #paragraph {
        width: 100%;
        max-width: 500px;
        margin-top: 2%;
        font-size: 16px;
        color: var(--secondary-text);
        margin-bottom: 2%;
    }

    .buttons {
        display: flex;
        padding-top: 10px;
        gap: 16px;
    }

    .logo {
        width: 100%;
        max-width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo img {
        height: clamp(20vw, 30vw, 630px);
        max-height: 630px;
        object-fit: contain;
    }

    @media screen and (max-width: 1300px) {
         .splash h1 {
            font-size: 40px;
        }

        #paragraph {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 1100px) {
        .splash {
            justify-content: space-between;
        }

        .info {
            width: 100%;
            padding: 0 5%;
            max-width: 600px; /* Juster max-width for bedre responsivitet */
        }

        #paragraph {
            width: 100%;
            max-width: 500px;
        }

        .logo {
            display: none;
        }
    }

    @media screen and (max-width: 600px) {
        .splash h1 {
            font-size: 30px;
        }

        #paragraph {
            font-size: 16px;
        }
    }
</style>