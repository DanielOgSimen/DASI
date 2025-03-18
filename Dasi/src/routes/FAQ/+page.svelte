<script>
    import { onMount } from 'svelte';
    import Question from "../../components/FAQ/question.svelte";
    import InputPromt from "../../components/input-promt.svelte";
    
    let inputLabel = ""
    let inputLabels = ["Ask us a question", "Search for a question", "Type your question here", "What can we help you with?", "What are you looking for?", "Ask us anything", "Search for a question"];
    let data = []; // Denne variabelen er en tom liste som skal fylles med dataen fra json filen
    let allData = [];
    let searchQuery = ""; // Denne variabelen er en tom string som skal fylles med søkeordet fra input feltet
    let questionsShown = 10;
    let loadButtonText = "Load more"
    let showLoadMore = true;
    let rotationIcon = "360deg";

    const getData = async () => {
        const response = await fetch("/api/faq.json");
        const result = await response.json();
        return result.questions; //denne funskjonen henter dataen fra json filen og returnerer daten den henter
    };

    onMount(async () => {
        allData = await getData();
        data = allData;
        console.log(data); // denne funksjonen bruker return verdien fra getData funksjonen og setter data til å være lik den verdien

        //ender labels til de uliek labelene i inputLabels arrayet
        let index = 0;
        inputLabel = inputLabels[index];
        const changeLabels = setInterval(()=> {
            index = (index + 1) % inputLabels.length;
            inputLabel = inputLabels[index];
        }, 4000);
    });

    $: if (searchQuery) {
        data = allData.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase())|| item.answer.toLowerCase().includes(searchQuery.toLowerCase()));;
        showLoadMore = false;
        // Denne funksjonen filtrerer dataen basert på søkeordet og setter data til å være lik den filtrerte listen
    } else {
        data = allData.slice(0, questionsShown);
        showLoadMore = true;
    };

    const loadMore = () => {
        if (questionsShown >= allData.length) {
            questionsShown = 10; // reseter antall spørsmål som vises til 10
            loadButtonText = "Load more";
            rotationIcon = "360deg";
        } else {
            questionsShown += 10; // øker antall spørsmål som vises med 10
            if (questionsShown >= allData.length) {
                loadButtonText = "Show less";
                rotationIcon = "180deg";
            }
        }
    };
</script>

<div class="backgroundSearch">
    <div class="searchSection">
        <InputPromt bind:bindValue={searchQuery} label={inputLabel} Width="clamp(20rem, 35vw, 30rem)" external={false} onEnter={() => {}} />
    </div>
</div>  
<div class="body">
    <div class="FAQBody">
        <div class="headerBody">
            <h3 class="regular accent-blue"><a class=" effect-underline" href="/">Information/</a><a class=" effect-underline" href="https://dasigpt.com/FAQ">FAQ</a></h3>
            <h1 class="medium">YOU<br> MAY BE <br><span class="accent-blue">LOOKING FOR</span></h1>
        </div>
        <div class="questions">
            {#each data as question (question.id)} <!-- Denne løkken kjører antall objekter i listen ganger og setter hvert objekt til en variabel questions som tilsvarer det nåværende objektet av data  -->
                <Question title={question.question} id={question.id} answerText={question.answer} />
            {/each}
        </div>
        {#if showLoadMore}
        <div class="allMore">
            <button on:click={loadMore} class="loadMoreButton">
                <div class="loadMore">{loadButtonText}</div>
                <ion-icon style="rotate: {rotationIcon};" class="moreIcon" name="chevron-down-outline"></ion-icon>
            </button>
        </div>
        {/if}
    </div>
</div>

<style>
a {
    color: var(--accent);
    text-decoration: none;
}
a::after {
    height: 0.5em;
}
.loadMoreButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: transform 0.2s;
    border: none;
    background-color: var(--background);
    color: var(--primary-text);
}

.loadMoreButton:hover {
    transform: translateY(3px);
}

.allMore {
    display: flex;
    justify-content: center;
    margin-bottom: 5rem;
}

.loadMore {

    font-size: 16px;
    cursor: pointer;
}

.moreIcon {
    visibility: visible;
    font-size: 16px;
    cursor: pointer;
    transition: rotate 0.1s;
}

.searchSection {
    margin-top: 80px;
}

.backgroundSearch {
    background: linear-gradient(90deg, var(--accent), var(--primary-text));
    height: 40vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.questions {
    margin-top: 2rem;
}

.body {
    display: flex;
    justify-content: center;
    width: 100%;
}

h3 {
    font-size: 1rem;
}

.headerBody {
    color: var(--secondary-text);
}

.FAQBody {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 100px;
}
</style>