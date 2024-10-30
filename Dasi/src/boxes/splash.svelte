<script>
    import CtaButton from "../components/cta-button.svelte";
    import '/src/styles/global.css';
</script>

<div class="splash">
    <div class="info">
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
            <button class="purple-button regular">Log in</button>
        </div>
    </div>
    <div class="logo">
        <img src="/src/Images/Dasi logo.png" alt="DASI-gpt logo">
    </div>
</div>

<style>
    .splash {
        height: 100vh;
        width: 100vw;
        background-color: #121212;
        color: #E0E0E0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .splash h1 {
        font-size: 50px;
    }

    .info {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: space-around;
        padding-left: 5%;
    }

    #paragraph {
        width: 50%;
        margin-top: 2%;
        font-size: 20px;
        color: #B0B0B0;
    }

    .buttons {
        display: flex;
        justify-content: space-around;
        width: 50%;
        padding-top: 10px;
    }

    .logo {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo img {
        width: 80%;
    }
</style>