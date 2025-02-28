<script>
    import { onMount } from 'svelte';
    import Question from "../../components/FAQ/question.svelte";
    import InputPromt from "../../components/input-promt.svelte";
    
    let inputLabel = ""
    let inputLabels = ["Ask a question", "Search for a question", "Type your question here"];
    let data = []; // Denne variabelen er en tom liste som skal fylles med dataen fra json filen
    let allData = [];
    let searchQuery = ""; // Denne variabelen er en tom string som skal fylles med søkeordet fra input feltet

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
        }, 5000);
    });

    $: if (searchQuery) {
        data = allData.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()));;
        // Denne funksjonen filtrerer dataen basert på søkeordet og setter data til å være lik den filtrerte listen
    } else {
        data = allData;
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
            <h3 class="regular accent-blue">FAQ</h3>
            <h1 class="medium">YOU<br> MAY BE <br><span class="accent-blue">LOOKING FOR</span></h1>
        </div>
        <div class="questions">
            {#each data as question,id} <!-- Denne løkken kjører antall objekter i listen ganger og setter hvert objekt til en variabel questions som tilsvarer det nåværende objektet av data  -->
                <Question title={question.question} id={id} answerText={question.answer} />
            {/each}
        </div>
    </div>  
</div>

<style>
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