<script>
    export let imgUrl = 'src/Images/cards-homepage/Climate-friendly.png';
    export let cardTopic = 'Climate-friendly';
    export let cardContent = 'DASI-GPT saves 50% more water than other systems.';
</script>

<div class="card" style="background-image: url({imgUrl});">
    <h1 class="cardTopic medium">{cardTopic}</h1>
    <div class="card-content display-card">
        <h3 class="italic regular" style="font-size:16px; margin-bottom:1rem;">{cardContent}</h3>
        <button class="button purple">Read more</button>
    </div>
</div>

<style>
    .cardTopic {
        text-align: center;
        transform: translateY(1300%); /* Start fra bunnen */
        transition: transform 0.4s;
        color: var(--background);
        text-shadow: white 0px 0px 10px;

    }

    .card:hover .cardTopic {
        transform: translateY(750%); /* Flytt til dit den skal */
        color: var(--primary-text);
    }

    .card-content {
        display: none; /* Skjul ved default */
        opacity: 0%; /* Start med opacity 0 */
        transform: translateY(170%); /* Start fra bunnen */
        transition: opacity 0.3s, transform 0.4s; /* Overgang på 2 sekunder */
    }

    .card:hover .card-content {
        display: block; /* Vis ved hover på card */
        opacity: 100%; /* Endre til opacity 1 */
        transform: translateY(130%); /* Flytt til dit den skal */
    }

    .card {
        height: 30rem;
        display: block;
        width: 20rem;
        background-size: cover;
        position: relative; /* For å posisjonere pseudo-elementet absolutt */

    }

    .card::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transition: background-color 0.4s; /* Overgangseffekt for bakgrunnsfarge */
    }

    .card:hover::before {
        background-color: rgba(0, 0, 0, 0.5); /* Mørkere bakgrunn ved hover */
    }

    .card-content {
        display: block;
        color: var(--secondary-text); /* Sørg for at teksten er lesbar på bakgrunnsbildet */
        text-align: center;
        padding: 2rem;
    }
</style>
