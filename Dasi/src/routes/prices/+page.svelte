<script>
    import SubCard from '../../components/boxes/subscribtionCard.svelte';
    import Coockies from '../../components/coockies/coockies.svelte';
</script>

<div class="wrapper">
    <div class="subCards">
       
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
    @media (max-width: 1350px) {
        .subCards {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 700px) {
        .subCards {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>