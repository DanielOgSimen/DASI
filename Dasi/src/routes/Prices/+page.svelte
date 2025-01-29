<script>
    import SubCard from '../../components/boxes/subscribtionCard.svelte';
    import Coockies from '../../components/coockies/coockies.svelte';
    import Cookie from "../../components/coockies/coockies.svelte";
</script>

<div class="wrapper">
    <div class="subCards">
        <SubCard 
        SubscriptionType="Starter" 
        SubscriptionPrice="$10" 
        buttonText = "Go to Payment" 
        SubscriptionIntro = "For beginners and normal people" 
        SubscriptionContent={["Hei","blå"]}
        IconName="rocket-outline"
        ></SubCard>

        <SubCard 
        SubscriptionType="Standard" 
        SubscriptionPrice="$50" 
        buttonText = "Go to Payment" 
        SubscriptionIntro = "For beginners and normal people" 
        SubscriptionContent={["Hei","blå"]}
        IconName="briefcase-outline"
        ></SubCard>

        <SubCard 
        SubscriptionType="Professional" 
        SubscriptionPrice="$500" 
        buttonText = "Go to Payment" 
        SubscriptionIntro = "For beginners and normal people" 
        SubscriptionContent={["Hei","blå"]}
        IconName="business-outline"
        ></SubCard>

        <SubCard 
        SubscriptionType="Enterprise" 
        SubscriptionPrice="$2000" 
        buttonText = "Contact us" 
        SubscriptionIntro = "For beginners and normal people" 
        SubscriptionContent={["Hei","blå","Daniel"]}
        IconName="people-outline"
        ></SubCard>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 80px;
    }

    .subCards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        justify-content: center;
        align-items: stretch;
    }
    @media (max-width: 1350px) {
        .subCards {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 700px) {
        .subCards {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>