<svelte:head>
    <title>Payment Canceled | Dasi-GPT</title>
</svelte:head>

<div class="ordertext">
    <ion-icon class="icon" name="sad-outline"></ion-icon>
    <h1>Ops!</h1>
    <p>Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.</p>
    <a href="https://dasigpt.com/"><button class="button purple backButton">Back</button></a>
</div>
<style>
    .backButton {
        margin-top: 1rem;
    }

    .ordertext {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 40px);
        
    }

    .icon {
        font-size: 50px;
        visibility: visible;
        color: var(--error);
    }

    h1 {
        font-size: 30px;
        color: var(--primary-text);
    }

    p {
        font-size: 16px;
        text-align: center;
        margin-top: 0.5rem;
        color: var(--secondary-text);
        width: 40%;
    }
 
</style>