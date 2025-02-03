<script lang="ts">
import { onMount } from 'svelte';

let visible = false; 

const removeCookieBox = () => {
    const allContent = document.querySelector('.allContent');
    if (allContent instanceof HTMLElement) {
        allContent.style.visibility = 'hidden';
    }
}
    onMount(() => {
        setTimeout(() => {
            if (!localStorage.getItem("cookiesAccepted")) {
                visible = true;
            }
        }, 1000);
    });
    

    localStorage.removeItem("cookiesAccepted"); // for testing purposes
    const cookiesAccept = () => {
        removeCookieBox();
        localStorage.setItem("cookiesAccepted", "true");
        setCookie("cookiesAccepted", "true", 30);
        
        
    }

    const setCookie = (name: string, value: string, days: number) => {
        let expires = ""
        if (days) {
            const date = new Date(); 
            date.setTime(date.getTime() + (days*24*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }


</script>
{#if visible}
<div class="allContent">
    <div class="coockieBox">
        <div class="coockieContent">
            <h1>Cookies</h1>
            <p>We use cookies to give you a better experience on our site. By continuing to use our website, you accept the use of cookies.</p>
            <div class="cookieButtons">
                <button class="cookieButton cookieBlue" on:click={cookiesAccept}>Accept</button>
                <button class="cookieButton cookieGray">Customize</button>            
                <button class="cookieButton cookieGray">Necessary</button>
            </div>
        </div>
        <img src="/Images/coockieCoockies.png" alt="">
    </div>
</div>
{/if}
<style>
/*     coockie buttons  */
    .cookieButton {
        border: none;
        padding: 0.5rem 5px;
        border-radius: 5px;
        cursor: pointer;
        color: var(--boarder-divider);
        transition: transform 0.3s;
    }

    .cookieBlue {
        background-color: var(--secondary-accent);
    }

    .cookieGray {
        background-color: var(--primary-text);
    }

    .cookieButton:hover {
        transform: translateY(-2px);
    }

    .cookieButtons {
        display: flex;
        gap: 10px;
    }

    .allContent {
        display: flex;
        margin: 0 2rem 2rem 0;
        position: fixed;
        bottom: 0;
        right: 0;
        animation: slide 0.5s;
    }

    @keyframes slide {
        0% {
            transform: translate(110%);
        }
        100% {
            transform: translate(0%);
        }
    }

    h1 {
        color: var(--primary-text);
        font-size: 30px;
        margin-bottom: 1rem;
    }

    img {
        width: 40%;
        object-fit: contain;
        rotate: 12.5deg;
    }

    p {
        color: var(--secondary-text);
        font-size: 13px;
        margin-bottom: 1rem;
    }
    .coockieBox {
        background-color: var(--background);
        display: flex;
        flex-direction: row;
        width: clamp(450px, 45vw, 500px);
        padding: 2rem;
        border-radius: 26px;
        gap: 2rem;
    }

</style>