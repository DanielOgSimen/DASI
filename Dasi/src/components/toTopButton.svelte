<script>
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>
<button class="toTopButton" on:click={scrollToTop}>
    <ion-icon name="arrow-up-outline"></ion-icon>
</button>
<style>
    .toTopButton {
        height: 40px;
        width: 40px;
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--accent);
        border-radius: 50%;
        padding: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
        border: none; 
        outline: none;
    }

    ion-icon {
        color: black;
        font-size: 17px;
        visibility: visible;
        transition: transform 0.2s; 
    }

    .toTopButton:hover ion-icon {
        transform: translateY(-3px); 
    }
</style>
