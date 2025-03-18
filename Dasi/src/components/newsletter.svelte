<script>
    import InputPromt from "./input-promt.svelte";
</script>
<div class="allContent">
    <p>Feel free to subscribe to our newsletter down below</p>
    <div class="newsletterButtonInput">

        <InputPromt HideSvg={true} labelClass="nolabelAnimation" label="E-mail" Width=15rem external={false} onEnter={() => {}} />
        <button type="button">Subscribe</button>
    </div>
</div>
<style>
    p {
        text-align: center;
        font-size: 16px;
        color: var(--secondary-text);
        margin-bottom: 0.6rem;
    }
    .allContent {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .newsletterButtonInput {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    button {
        color: var(--background);
        border: none;
        border-radius: 10px;
        padding: 14px; /* legger på ekstra padding på høyre side så teksten ikke går bak ikonet*/
        font-size: 16px;
        cursor: pointer;
        background: linear-gradient(to right, var(--secondary-accent) 50%,var(--accent)  50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: all 0.1s ease-out;
    }
    button:hover {
        background-position: left bottom;
    }
</style>