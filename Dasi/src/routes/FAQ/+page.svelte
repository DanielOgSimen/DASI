<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Question from "../../components/FAQ/question.svelte";
    import InputPromt from "../../components/input-promt.svelte";
    
    let data = [];


    const search = () => {
        console.log("hei");
    };
    const getData = async () => {
        const response = await fetch("/api/faq.json");
        const data = await response.json();
        return data;
    };
    onMount(async () => {
        let data = await getData();
        console.log(data);
    });


    
</script>
<div class="backgroundSearch">
    <div class="searchSection">
        <InputPromt Width="30rem" onEnter={search} external={true} />
    </div>
</div>  
<div class="body">
    <div class="FAQBody">
        <div class="headerBody">
            <h3 class="regular accent-blue">FAQ</h3>
            <h1 class="medium">YOU<br> MAY BE <br><span class="accent-blue">LOOKING FOR</span></h1>
        </div>
        <div class="questions">
            {#each data as question, id}
                <Question id={question.id} />
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
    color:var(--secondary-text);
}
.FAQBody {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 100px;
}
</style>