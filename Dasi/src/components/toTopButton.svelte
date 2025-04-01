<script>
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>
<button class="toTopButton" onclick={scrollToTop}><svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 512 512"><polyline points="112 244 256 100 400 244" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/><line x1="256" y1="120" x2="256" y2="412" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px"/></svg></button>
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

    svg {
        color: black;
        font-size: 17px;
        visibility: visible;
        transition: transform 0.2s; 
    }

    .toTopButton:hover svg {
        transform: translateY(-3px); 
    }
</style>
