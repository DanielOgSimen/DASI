<script>
    import SubCard from '../../components/boxes/subscribtionCard.svelte';
</script>

<svelte:head>
    <title>Pricing | Dasi-GPT</title>
</svelte:head>

<div class="wrapper">
        <div class="subCards">
            <SubCard 
            SubscriptionType="Starter" 
            SubscriptionPrice={10} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Ideal for individuals and small businesses starting with chatbot technology." 
            SubscriptionContent={["Basic chatbot functionality", "Limited customization and integrations", "Suitable for small websites or simple customer service tasks.", "Limited number of messages or interactions per month."]}
            IconSvg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M461.81,53.81a4.4,4.4,0,0,0-3.3-3.39c-54.38-13.3-180,34.09-248.13,102.17a294.9,294.9,0,0,0-33.09,39.08c-21-1.9-42-.3-59.88,7.5-50.49,22.2-65.18,80.18-69.28,105.07a9,9,0,0,0,9.8,10.4l81.07-8.9a180.29,180.29,0,0,0,1.1,18.3,18.15,18.15,0,0,0,5.3,11.09l31.39,31.39a18.15,18.15,0,0,0,11.1,5.3,179.91,179.91,0,0,0,18.19,1.1l-8.89,81a9,9,0,0,0,10.39,9.79c24.9-4,83-18.69,105.07-69.17,7.8-17.9,9.4-38.79,7.6-59.69a293.91,293.91,0,0,0,39.19-33.09C427.82,233.76,474.91,110.9,461.81,53.81ZM298.66,213.67a42.7,42.7,0,1,1,60.38,0A42.65,42.65,0,0,1,298.66,213.67Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M109.64,352a45.06,45.06,0,0,0-26.35,12.84C65.67,382.52,64,448,64,448s65.52-1.67,83.15-19.31A44.73,44.73,0,0,0,160,402.32" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>'
            ></SubCard>

            <SubCard 
            SubscriptionType="Standard" 
            SubscriptionPrice={50} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Perfect for growing businesses needing more advanced chatbot capabilities." 
            SubscriptionContent={["More advanced conversational capabilities", "Customizable chatbot templates", "Integration with basic CRMs and customer support platforms.", "Moderate volume of interactions (e.g., 1,000-10,000/month).", "Basic analytics and reporting."]}
            IconSvg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="32" y="128" width="448" height="320" rx="48" ry="48" style="fill:none;stroke-linejoin:round;stroke-width:32px"/><path d="M144,128V96a32,32,0,0,1,32-32H336a32,32,0,0,1,32,32v32" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="480" y1="240" x2="32" y2="240" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M320,240v24a8,8,0,0,1-8,8H200a8,8,0,0,1-8-8V240" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>'
            ></SubCard>

            <SubCard 
            SubscriptionType="Professional" 
            SubscriptionPrice={500} 
            buttonText = "Go to Payment" 
            SubscriptionIntro = "Designed for professionals requiring advanced features and higher interaction." 
            SubscriptionContent={["Advanced NLP capabilities for better understanding.", "Multi-channel support (website, social media, messaging apps).", "Integration with more advanced systems (e.g., marketing tools, advanced CRMs).", "Higher message volume (10,000+ per month).", "Custom workflows and automations.", "Enhanced analytics and reporting features."]}
            IconSvg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><line x1="176" y1="416" x2="176" y2="480" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M80,32H272a32,32,0,0,1,32,32V476a4,4,0,0,1-4,4H48a0,0,0,0,1,0,0V64A32,32,0,0,1,80,32Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M320,192H432a32,32,0,0,1,32,32V480a0,0,0,0,1,0,0H304a0,0,0,0,1,0,0V208A16,16,0,0,1,320,192Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M98.08,431.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,431.87Z"/><path d="M98.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,351.87Z"/><path d="M98.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,271.87Z"/><path d="M98.08,191.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,191.87Z"/><path d="M98.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,111.87Z"/><path d="M178.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,351.87Z"/><path d="M178.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,271.87Z"/><path d="M178.08,191.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,191.87Z"/><path d="M178.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,111.87Z"/><path d="M258.08,431.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,431.87Z"/><path d="M258.08,351.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,351.87Z"/><path d="M258.08,271.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,271.87Z"/><ellipse cx="256" cy="176" rx="15.95" ry="16.03" transform="translate(-49.47 232.56) rotate(-45)"/><path d="M258.08,111.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,111.87Z"/><path d="M400,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/><path d="M400,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/><path d="M400,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/><path d="M336,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/><path d="M336,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/><path d="M336,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/></svg>'
            ></SubCard>

            <SubCard 
            SubscriptionType="Enterprise" 
            SubscriptionPrice={2000} 
            buttonText = "Contact us" 
            SubscriptionIntro = "Tailored for large enterprises needing comprehensive AI solutions." 
            SubscriptionContent={["Highly sophisticated AI with deep learning and customization options.", "Full integration with complex systems (ERP, sales platforms, etc.).", "Multi-lingual support and advanced personalization.", "Unlimited interactions with advanced scalability.", "Dedicated support and account management.", "Detailed, real-time reporting and AI-driven insights.", "Enterprise-grade security and compliance features."]}
            IconSvg='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M402,168c-2.93,40.67-33.1,72-66,72s-63.12-31.32-66-72c-3-42.31,26.37-72,66-72S405,126.46,402,168Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M336,304c-65.17,0-127.84,32.37-143.54,95.41-2.08,8.34,3.15,16.59,11.72,16.59H467.83c8.57,0,13.77-8.25,11.72-16.59C463.85,335.36,401.18,304,336,304Z" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><path d="M200,185.94C197.66,218.42,173.28,244,147,244S96.3,218.43,94,185.94C91.61,152.15,115.34,128,147,128S202.39,152.77,200,185.94Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M206,306c-18.05-8.27-37.93-11.45-59-11.45-52,0-102.1,25.85-114.65,76.2C30.7,377.41,34.88,384,41.72,384H154" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>'
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