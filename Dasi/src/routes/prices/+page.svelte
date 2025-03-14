<script>
    import SubCard from '../../components/boxes/subscribtionCard.svelte';
</script>
<div class="wrapper">
        <div class="subCards">
            <SubCard 
            SubscriptionType="Starter" 
            SubscriptionPrice={10} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Ideal for individuals and small businesses starting with chatbot technology." 
            SubscriptionContent={["Basic chatbot functionality", "Limited customization and integrations", "Suitable for small websites or simple customer service tasks.", "Limited number of messages or interactions per month."]}
            IconName="rocket-outline"
            ></SubCard>

            <SubCard 
            SubscriptionType="Standard" 
            SubscriptionPrice={50} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Perfect for growing businesses needing more advanced chatbot capabilities." 
            SubscriptionContent={["More advanced conversational capabilities", "Customizable chatbot templates", "Integration with basic CRMs and customer support platforms.", "Moderate volume of interactions (e.g., 1,000-10,000/month).", "Basic analytics and reporting."]}
            IconName="briefcase-outline"
            ></SubCard>

            <SubCard 
            SubscriptionType="Professional" 
            SubscriptionPrice={500} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Designed for professionals requiring advanced features and higher interaction." 
            SubscriptionContent={["Advanced NLP capabilities for better understanding.", "Multi-channel support (website, social media, messaging apps).", "Integration with more advanced systems (e.g., marketing tools, advanced CRMs).", "Higher message volume (10,000+ per month).", "Custom workflows and automations.", "Enhanced analytics and reporting features."]}
            IconName="business-outline"
            ></SubCard>

            <SubCard 
            SubscriptionType="Enterprise" 
            SubscriptionPrice={2000} 
            buttonText = "Contact us" 
            SubscriptionIntro = "Tailored for large enterprises needing comprehensive AI solutions." 
            SubscriptionContent={["Highly sophisticated AI with deep learning and customization options.", "Full integration with complex systems (ERP, sales platforms, etc.).", "Multi-lingual support and advanced personalization.", "Unlimited interactions with advanced scalability.", "Dedicated support and account management.", "Detailed, real-time reporting and AI-driven insights.", "Enterprise-grade security and compliance features."]}
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
    @media (max-width: 1730px) {
        .subCards {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 900px) {
        .subCards {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>