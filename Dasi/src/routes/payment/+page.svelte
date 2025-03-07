<script>
    import { loadStripe } from "@stripe/stripe-js";

    let stripe;
    let elements;
    let cardElement;
    let paymentMessage = "";
    let name = "";
    let email = "";

    (async () => {
        stripe = await loadStripe("pk_test_51QytqhIoIw0g3p2UVMuFPipkasAdKG5xXQnR1PCFyE8KBKrujUHyjyXg3kF11braBV4pHtTM3u54oCphfYHYVeS500Vqmy8zit");
        if (stripe) {
            elements = stripe.elements();

            const style = {
                base: {
                    color: "#32325d",
                    fontSize: "16px",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": { color: "#aab7c4" }
                },
                invalid: { color: "#fa755a" }
            };

            cardElement = elements.create("card", { style });
            cardElement.mount("#card-element");
        }
    })();

    async function handlePayment(event) {
        event.preventDefault();

        if (!stripe || !cardElement) {
            paymentMessage = "Stripe er ikke lastet inn.";
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name: name,
                email: email
            }
        });

        if (error) {
            paymentMessage = error.message;
        } else {
            const response = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id })
            });

            const data = await response.json();
            if (data.error) {
                paymentMessage = data.error;
            } else {
                paymentMessage = "Betaling vellykket!";
            }
        }
    }
</script>

<div class="paymentContent">
    <div class="paymentInfo">
        <form id="payment-form" class="paymentForm" on:submit={handlePayment}>
            <ion-icon class="paymentIcon" name="card-outline"></ion-icon>
            <div class="formTitle">
                <hr class="questionLine">
                <h3 style="font-size:13px;" class="regular">Fill Out This Form</h3>
                <hr class="questionLine">
            </div>

            <div class="paymentName">
                <label for="name">Name</label>
                <input id="name" type="text" bind:value={name} required />
            </div>
            <div class="paymentEmail">
                <label for="email">Email</label>
                <input id="email" type="email" bind:value={email} required />
            </div>
            <div id="card-element"></div>
            <p id="payment-message">{paymentMessage}</p>
            <button type="submit">Betal</button>
        </form>
    </div>
</div>

<style>
    .paymentIcon {
        display: flex;
        font-size: 80px;
        visibility: visible;
    }
    .formTitle {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .questionLine {
        flex: 1;
        border: none;
        border-top: 1px solid #000; 
        margin: 0 1rem; 
        color: var(--secondary-text);
    }
    .paymentName, .paymentEmail {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    .paymentContent {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, var(--accent), var(--primary-text));
    }

    .paymentInfo {
        border-radius: 16px;
        background-color: var(--background);
    }

    .paymentForm {
        padding: 3rem 2rem;
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
    }
</style>