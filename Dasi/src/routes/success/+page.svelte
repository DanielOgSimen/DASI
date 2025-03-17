<script>
    import Newsletter from "../../components/newsletter.svelte";
</script>
<div class="ordertext">
    <ion-icon name="bag-check-outline" class="icon"></ion-icon>
    <h1>Thank you!</h1>
    <p>Your order has been received and is now being processed. You will receive an email with the details of your purchase shortly.</p>
    <div class="newsletterSection">
        <Newsletter />
    </div>
</div>
<style>
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
        color: var(--accent);
    }

    h1 {
        font-size: 30px;
        color: var(--primary-text);
    }
    .newsletterSection {
        margin-top: 1rem;
    }

    p {
        font-size: 16px;
        text-align: center;
        margin-top: 0.5rem;
        color: var(--secondary-text);
        width: 40%;
    }
 
</style>