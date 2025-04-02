<script lang="ts">
// Async funksjon for å håndtere utsjekkingsprosessen
async function checkout(name: string, price: number, amount: number) {
  // Send en POST-forespørsel til "/checkout"-endepunktet
  const data = await fetch("https://dasigpt.com/checkout", {
    method: "POST", // HTTP-metode
    headers: {
      "Content-Type": "application/json", // Angi innholdstypen som JSON
    },
    body: JSON.stringify({
      // Konverter elementdataene til en JSON-streng
      items: [{ name, price, amount }],
    }),
  }).then((data) => data.json()); // Hent JSON-data fra responsen
  window.location.replace(data.url); // Omdiriger brukeren til URL-en fra responsen
};

    interface Props {
        SubscriptionType?: string;
        SubscriptionPrice?: number;
        buttonText?: string;
        SubscriptionIntro?: string;
        SubscriptionContent?: any;
        IconSvg?: string;
    }

    let {
        SubscriptionType = "Starter",
        SubscriptionPrice = 10,
        buttonText = "Go to Payment",
        SubscriptionIntro = "For beginners and normal people",
        SubscriptionContent = [
        "Access to all content",
        "Access to all features",
        "Access to all updates",
        "Basic chatbot functionality",
        "Limited customization and integrations",
        "Suitable for small websites or simple customer service tasks.",
        "Limited number of messages or interactions per month."
    ],
        IconSvg = ""
    }: Props = $props();

</script>

<div class="subCard">
    <div class="iconContainer">
        {@html IconSvg}
    </div>
    
    <div class="header">
        <h1 class="bigText bold">{SubscriptionType}</h1>
        <p class="intro">{SubscriptionIntro}</p>
    </div>
    <div class="price">
        <h1 class="bigText bold">{SubscriptionPrice}<span class="smallText">.00</span></h1>
        <p class="priceInfo">USD/month</p>
    </div>
    <button onclick={() => checkout(SubscriptionType, SubscriptionPrice, 1)} class="button purple priceButton">{buttonText}</button>
    <div class="divider"></div>
    <ul class="subCardInfo">
        {#each SubscriptionContent as item}
            <li>{item}</li>
        {/each}
    </ul>
</div>

<style>
    .priceButton {
        width: 100%;
    }
    
    .subCard {
        color: var(--secondary-text);
        border-radius: 12px;
        width: 100%;
        max-width: 400px;
        border: 1px solid var(--accent);
/*         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
        margin: 20px auto;
        padding: 30px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .subCard:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .iconContainer {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    :global(.iconContainer svg) {
        height: 80px;
        stroke: var(--accent);
    }

    .header {
        margin-bottom: 20px;
        color: var(--primary-text);
    }

    .bigText {
        font-size: 28px;
        margin-bottom: 5px;
    }

    .smallText {
        font-size: 18px;
    }

    .intro {
        font-size: 14px;
        color: var(--secondary-text);
    }

    .price {
        display: flex;
        align-items: baseline;
        gap:0.5rem; 
        margin-bottom: 1rem;
        color: var(--primary-text);
    }

    .priceInfo {
        font-size: 14px;
        color: var(--secondary-text);
    }

    .divider {
        height: 1px;
        background-color: var(--secondary-text);
        margin: 20px 0;
    }

    .iconContainer {
        font-size: 40px;
        color: var(--accent);
        margin-bottom: 10px;
    }

    .subCardInfo {
        font-size: 14px;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .subCardInfo li {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    }

    .subCardInfo li::before {
        content: '✔';
        margin-right: 8px;
        color: var(--accent);
    }

    @media (max-width: 700px) {
        .subCard {
            padding: 20px;
        }
    }

    @media (max-width: 500px) {
        .subCard {
            max-width: 100vw;
        }
    }
</style>