<script lang="ts">
    import e from "cors";

        export let title: string;
        export let text: string;
        export let link2: string;
</script>
<div class="backgroundSearch"></div>  
<div class="body">
    <div class="FAQBody">
        <div class="headerBody">
            <h3 class="regular accent-blue"><a href="https://dasigpt.com/">Information/</a><a href="https://dasigpt.com/{link2}">{link2}</a></h3>
            <h1 class="medium infotitle">{title}</h1>
        </div>
        <p>{text}</p>
    </div>
</div>

<style>
.infotitle {
    color: var(--primary-text);
    margin-bottom: 0.5rem;
}
.backgroundSearch {
    background: linear-gradient(90deg, var(--accent), var(--primary-text));
    height: 40vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
p {
    color: var(--secondary-text);
    font-size: 1rem;
    margin-top: 1rem;
    line-height: 2rem;
    margin-bottom: 5rem;
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