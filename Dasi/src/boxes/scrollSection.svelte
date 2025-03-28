<script>
    import Cards from "../components/boxes/cards-homepage.svelte";
    import InputPrompt from "../components/input-promt.svelte";
    import SubCards from "../components/boxes/subscribtionCard.svelte";
    
    import { onMount } from 'svelte';

onMount(function() {
    const section = document.querySelector('.sloganDisplay'); // henter ut section og setter den lik klassen
    if (section) { // sjekker om section eksisterer
        const observer = new IntersectionObserver(function(entries) { // lager en observer. funskjonen i observeren kjøres hver gang observer ser en endring
            entries.forEach(function(entry) { // kjøres hver gang observer ser en endring, for hver endring som observer ser. endringer skjer når man scroller
                if (entry.isIntersecting) { // hvis section vises er den true, eller så er den false. Dette er her fordi den ikek skal legge til klassen om det skjer en endring og den ikke er vises. 
                    section.classList.add('in-view');
                } else {
                    section.classList.remove('in-view');
                }
            });
        });

        observer.observe(section); // starter observeringen av section
    }
});

function handleKeyDown() {
    console.log(`Hei`)
}
let isSmallScreen = $state(false);

    const checkScreenSize = () => {
        isSmallScreen = window.innerWidth < 1050;
    };

    onMount(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    });
</script>

<div class="imgOneClick">
    <img class="promtImg" src="Images/OneClickPic.png" alt="">  
    <div class="OneClickText">
        <h1 style="color: #E0E0E0; margin-bottom: 1rem;" class="medium">Available in one<br><span class="accent-blue">click</span></h1>
        <div class="inpPromt">
            <InputPrompt labelClass="noLabelAnimation" onEnter={handleKeyDown} external={true} />
        </div>
    </div>
</div>
<section id="sectionPin">
    <div class:pin-wrap-sticky={!isSmallScreen}>
        <div class:pin-wrap={!isSmallScreen} class="pin-wrapDefault">
            <div class="selection1">
                <Cards link="/climate-friendly"></Cards>
                <Cards link="/efficient" cardTopic="Efficent" cardContent="DASI-GPT are efficent and gives you the answer quick!" imgUrl="Images/cards-homepage/Efficent.png"></Cards>
                <Cards link="/clean" cardTopic="Clean" cardContent="DASI-GPT gives a clean look, and are easy to navigate." imgUrl="Images/cards-homepage/Clean.png"></Cards>
                <Cards link="/safe" cardTopic="Safe" cardContent="DASI-GPT are 100% safe to use, we care about your saftey." imgUrl="Images/cards-homepage/Safe.png"></Cards>
            </div>
            <div class="selection2">
                <div class="subscribtionInfo">
                    <h1 style="margin-bottom: 1rem; margin-top:2rem;" class="medium"><span class="accent-blue">Explore</span> more of<br>
                        our amazing<br><span class="accent-blue">subscriptions</span>
                    </h1>
                    <a href="/prices"><button class="button purple">More subscriptions</button></a>
                </div>
                <div class="subscribtionBox">
                    <div class="subRes">
                        <SubCards 
                        SubscriptionType="Starter" 
                        SubscriptionPrice={10} 
                        buttonText = "Go to Payment" 
                        SubscriptionIntro = "Ideal for individuals and small businesses starting with chatbot technology." 
                        SubscriptionContent={["Basic chatbot functionality", "Limited customization and integrations", "Suitable for small websites or simple customer service tasks.", "Limited number of messages or interactions per month."]}
                        IconName="rocket-outline"
                        ></SubCards>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="sloganDisplay" class:in-view={!isSmallScreen}>
    <span class="text1">WE DO THE <span class="blueColor">WORK</span> FOR <span class="blueColor">YOU</span></span>
    <span class="text2">RELAX</span>
</div>


<style>
.blueColor {
    color: var(--accent);
    display: inline;
}

.sloganDisplay {
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--border-divider);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sloganDisplay span {
  display: inline; 
}

.text1 {
  color: #CCCCCC;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 8px;
  background: var(--border-divider);
  position: relative;
  animation-duration: 4s;
  animation-iteration-count: 1;
  white-space: nowrap;
}

.in-view .text1 {
  animation: slogan 2s linear forwards;
}


.text2 {
  font-size: 25px;
  color: var(--secondary-accent);
}

@keyframes slogan {
  0% {
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 20px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 8px;
    margin-bottom: -40px;
  }
  100% {

  }
}    
.selection2 {
    color: var(--primary-text);
    font-size: 26px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100vw;
    align-items: center;
    gap: 10rem;
}

.selection1 {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100vw;
}

.OneClickText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.imgOneClick {
    background-color: var(--border-divider);
    display: flex; 
    flex-direction: row;
    justify-content: center;
    gap: 15rem;
    height: 100vh;
}


@keyframes move {
	to {
		transform: translateX(calc(-100% + 100vw));
	}
}

#sectionPin {
	height: 500vh;
	overflow: visible;
	view-timeline-name: --section-pin-tl;
	view-timeline-axis: block;
}

.pin-wrap-sticky {
	height: 100vh;
	width: 100vw;
	position: sticky;
	top: 0;
	width: 100vw;
	overflow-x: hidden;
}

.pin-wrap {
	height: 100vh;
	width: 200vmax;
    background: linear-gradient(to right, var(--secondary-border-divider) 0%, var(--secondary-border-divider) 10%, var(--background) 100%);

	/* Hook animation */
	will-change: transform;
	animation: linear move forwards;

	/* Link animation to view-timeline */
	animation-timeline: --section-pin-tl;
	animation-range: contain 0% contain 100%;
}

.promtImg {
    width: 27rem;
    object-fit: contain;
}

.pin-wrapDefault {
    display: flex;
    flex-direction: row;
}

/* responsive */
@media (max-width: 1050px) {
        .imgOneClick {
            flex-direction: column;
            height: 100%;
            align-items: center;
            gap: 2rem;
        }
        .promtImg {
            margin: 0 auto;
            margin-top: 2rem;
            width: 60vw;
        }
        .inpPromt {
            margin-bottom: 2rem;
        }
        .pin-wrapDefault {
            flex-direction: column;
        }
        #sectionPin {
            height: 100%;
            background-color: var(--secondary-border-divider);  
        }
        .selection1 {
            flex-wrap: wrap;
            height: 100%;
            margin-top: 2rem;
            margin-bottom: 2rem;
            background-color: var(--secondary-border-divider);
        }
        .selection2 {
            background-color: var(--border-divider);
        }
        .sloganDisplay {
            background-color: var(--background);
        }
        .text1 {
            background-color: var(--background);
            font-size: 30px;
        }
        .subRes {
            margin-bottom: 3rem;
            margin-top: 3rem;
        }
    }
@media (max-width: 940px) {
    .selection2 {
        flex-direction: column;
        gap: 2rem;
    }
    .subscribtionBox {
        margin-bottom: 4rem;
    }
    .text1 {
        font-size: 30px;
        letter-spacing: 8px;
    }
    .in-view .text1 {
        animation: none;
    }
}

@media (max-width: 620px) {
    .text1 {
        font-size: 25px;
        letter-spacing: 5px;
    }
    .text2 {
        font-size: 15px;
    }
}

@media (max-width: 470px) {
    .text1 {
        font-size: 20px;
        letter-spacing: 3px;
    }
    .text2 {
        font-size: 10px;
    }
}
@supports (-webkit-hyphens:none) and (not (-ms-ime-align:auto)) {
    .pin-wrap {
        width: 100vw; /* Ensure the pin-wrap does not cause horizontal scrolling */
        display: flex;
        flex-direction: column; /* Stack items vertically */
        overflow-x: hidden; /* Prevent horizontal scrolling */
        animation: none; /* Remove the animation */
        height: 100%;
    }
    #sectionPin {
        height: auto; /* Adjust height to fit content */
        overflow: visible; /* Ensure no overflow */
    }
    .pin-wrap-sticky {
        position: relative; /* Change to relative to avoid sticky behavior */
        height: auto; /* Adjust height to fit content */
    }
}

</style>