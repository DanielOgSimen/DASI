<script></script>

<div class="card">
    <div class="card-content display-card">
        <h1>Climate-friendly</h1>
        <p>DASI-GPT is designed with sustainability in mind. By optimizing our data centers and using renewable energy sources, we significantly reduce our carbon footprint. Additionally, our efficient algorithms minimize energy consumption, making DASI-GPT a climate-friendly AI solution.</p>
    </div>
</div>

<style>
    .card-content {
        display: none; /* Skjul ved default */
        opacity: 0%; /* Start med opacity 0 */
        transform: translateY(100%); /* Start fra bunnen */
        transition: opacity 2s, transform 2s; /* Overgang på 2 sekunder */
    }

    .card:hover .card-content {
        display: block; /* Vis ved hover på card */
        opacity: 100%; /* Endre til opacity 1 */
        transform: translateY(0); /* Flytt til midten */
    }

    .card {
        height: 30rem;
        display: flex;
        width: 20rem;
        background-image: url("../Images/cards-homepage/Climate-friendly.png");
        background-size: cover;
        position: relative; /* For å posisjonere card-content absolutt */
    }

    .card-content {
        position: absolute; /* Posisjoner absolutt innenfor kortet */
        bottom: 0; /* Start fra bunnen */
        top: 0;
        width: 100%; /* Full bredde */
        justify-content: center; /* Sentrer innhold horisontalt */
        align-items: center; /* Sentrer innhold vertikalt */
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent bakgrunn for bedre tekstkontrast */
        color: white; /* Sørg for at teksten er lesbar på bakgrunnsbildet */
        padding: 1rem;
        border-radius: 10px;
    }
</style>
