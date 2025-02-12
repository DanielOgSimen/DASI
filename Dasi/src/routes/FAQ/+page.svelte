<script>
    import Question from "../../components/FAQ/question.svelte";
</script>
<div class="body">
    <div class="FAQBody">
        <div class="searchSection"></div>
        <div class="headerBody">
            <h3 class="regular accent-blue">FAQ</h3>
            <h1 class="medium">YOU<br> MAY BE <br><span class="accent-blue">LOOKING FOR</span></h1>
        </div>
        <div class="questions">
            <Question id ="1"/>
            <Question id ="2"/>
        </div>
    </div>  
</div>
<style>
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