<script>
    export let SubscriptionType = "Starter";
    export let SubscriptionPrice = "$10";
    export let buttonText = "Go to Payment";
    export let SubscriptionIntro = "For beginners and normal people";
    export let SubscriptionContent = `
    <li>Access to all content</li>
    <li>Access to all features</li>
    <li>Access to all updates</li>
    <li>Basic chatbot functionality</li>
    <li>Limited customization and integrations</li>
    <li>Suitable for small websites or simple customer service tasks.</li>
    <li>Limited number of messages or interactions per month.</li>`;
</script>

<div class="subCard">
    <h1 class="bigText bold">{SubscriptionType}</h1>
    <p style="font-size: 15px; margin-bottom:0.5rem;">{SubscriptionIntro}</p>
    <div class="price">
        <h1 class="bigText bold">{SubscriptionPrice}<span style="font-size: 17px;">.00</span></h1>
        <p style="font-size:14px;">USD/mo(annually)</p>
    </div>
    <button class="button purple">{buttonText}</button>
    <ul class="subCardInfo">
        {@html SubscriptionContent}
    </ul>
</div>

<style>
    .subCardInfo {
        font-size: 16px;
    }
    .bigText {
        font-size: 40px;
    }

    ul {
        display: flex;
        margin-top: 1rem;
        flex-direction: column;
        list-style-position: inside;
    }

    .price {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 0.7rem;
        margin-bottom: 0.5rem;
    }
    .subCard {
        background-color: #E0E0E0;
        color: #242424;
        padding: 80px 80px 120px 80px; 
        border-radius: 40px;
        margin-left: 2rem;
        max-width: 70%;
    }
    @media (max-width: 700px) {
        .subCard {
            padding: 40px 40px 60px 40px; 
        }
    }
    @media (max-width: 940px) {
        .subCard {
            margin-left: 0;
            max-width: 100%;
        }
    }
</style>