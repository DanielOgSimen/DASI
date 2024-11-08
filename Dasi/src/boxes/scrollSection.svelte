<script>
    import Cards from "../components/boxes/cards-homepage.svelte";
    import PromtInput from "../components/input-promt.svelte";
    import SubCards from "../components/boxes/subscribtionCard.svelte";
</script>

<div class="imgOneClick">
    <img style="width: 27rem; object-fit: contain;" src="/src/Images/OneClickPic.png" alt="">  
    <div class="OneClickText">
        <h1 style="color: #E0E0E0; margin-bottom: 1rem;" class="medium">Available in one<br><span class="accent-blue">click</span></h1>
        <PromtInput></PromtInput>
    </div>
</div>
<section id="sectionPin">
    <div class="pin-wrap-sticky">
        <div class="pin-wrap" style="display: flex; flex-direction: row;">
            <div class="selection1">
                <Cards></Cards>
                <Cards cardTopic="Efficent" cardContent="DASI-GPT are efficent and gives you the answer quick!" imgUrl="src/Images/cards-homepage/Efficent.png"></Cards>
                <Cards cardTopic="Clean" cardContent="DASI-GPT gives a clean look, and are easy to navigate." imgUrl="src/Images/cards-homepage/Clean.png"></Cards>
                <Cards cardTopic="Safe" cardContent="DASI-GPT are 100% safe to use, we care about you saftey." imgUrl="src/Images/cards-homepage/Safe.png"></Cards>
            </div>
            <div class="selection2">
                <div class="subscribtionInfo">
                    <h1 style="margin-bottom: 1rem;" class="medium"><span class="accent-blue">Explore </span>more of<br>
                        our amazing<br><span class="accent-blue">subscriptions</span>
                    </h1>
                    <button class="button purple">More subscriptions</button>
                </div>
                <div class="subscribtionBox">
                    <SubCards></SubCards>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="sloganDisplay">
    <span class="text1">WE DO THE WORK FOR YOU</span>
    <span class="text2">RELAX</span>
</div>


<style>
.sloganDisplay {
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: #1A1A1A;
}

.sloganDisplay span {
  display: block; 
}

.text1 {
  color: #CCCCCC;
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 8px;
  background: #1A1A1A;
  position: relative;
  animation-name: slogan;
  animation-duration: 4s;
  animation-iteration-count: 1;
}

.text2 {
  font-size: 25px;
  color: #81C784;
}

@keyframes slogan {
  0% {
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 25px;
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
    color: #E0E0E0;
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
    background-color: #1A1A1A;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    gap: 15rem;
    height: 100vh;
}


  @keyframes move {
	to {
		/* Move horizontally so that right edge is aligned against the viewport */
		transform: translateX(calc(-100% + 100vw));
	}
}

#sectionPin {
	/* Stretch it out, so that we create room for the horizontal scroll animation */
	height: 500vh;
	overflow: visible; /* To make position sticky work … */

	view-timeline-name: --section-pin-tl;
	view-timeline-axis: block;
}

.pin-wrap-sticky {
	/* Stick to Top */
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
    background-color:#242424;

	/* Hook animation */
	will-change: transform;
	animation: linear move forwards;

	/* Link animation to view-timeline */
	animation-timeline: --section-pin-tl;
	animation-range: contain 0% contain 100%;
}
</style>