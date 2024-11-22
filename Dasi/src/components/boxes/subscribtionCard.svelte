<div class="subCard">
    <h1 class="bigText bold">Starter</h1>
    <p style="font-size: 15px; margin-bottom:0.5rem;">For beginners and normal people</p>
    <div class="price">
        <h1 class="bigText bold">$10<span style="font-size: 17px;">.00</span></h1>
        <p style="font-size:14px;">USD/mo(annually)</p>
    </div>
    <button class="button purple">Go to Payment</button>
    <ul style="font-size: 16px;">
        <li>Access to all content</li>
        <li>Access to all content</li>
        <li>Access to all content</li>
        <li>Access to all content</li>
    </ul>
</div>

<style>
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
    }
    @media (max-width: 700px) {
        .subCard {
            padding: 40px 40px 60px 40px; 
        }
    }
</style>