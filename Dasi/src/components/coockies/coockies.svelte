<script lang="ts">
import { afterUpdate, onMount } from 'svelte';
let custom = false;
let visible = false; 
/* afterUpdate(() => {
    console.log(necessaryCookies);
    console.log(analyticsCookies);
    console.log(marketingCookies);
    }
); */
let necessaryCookies = true;
let analyticsCookies = false;
let marketingCookies = false;


const removeCookieBox = () => {
    visible = false;
}
    onMount(() => {
        setTimeout(() => {
            if (!localStorage.getItem("cookiesChoose")) {
                visible = true;
            }
        }, 1000);
    });

    /* set cookies */
    const setCookie = (name: string, value: string, days: number) => {
        let expires = ""
        if (days) {
            const date = new Date(); 
            date.setTime(date.getTime() + (days*24*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

/*     localStorage.removeItem("cookiesChoose"); */ //for testing når man skal få opp coockies boksen igjen
const deleteCookies = () => {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

    /* accept cookies */
    const cookiesAccept = () => {
        nessesary();
        AddAnalyticsCookies();
        AddMarketingCookies();
    }

    /* nessesary cookies */
    const nessesary = () => {
        setCookie("nessesary", "true", 30);
        localStorage.setItem("cookiesChoose", "true");
        removeCookieBox();
    }
    
    /* custom cookies */
    const cookiesCustom = () => {
        custom = true;
        removeCookieBox();
    }
    /* remove custom cookies */
    const removeCostom = () => {
        custom = false;
        nessesary();
        if (analyticsCookies && marketingCookies) {
            AddAnalyticsCookies();
            AddMarketingCookies();
        } else if (analyticsCookies) {
            AddAnalyticsCookies();
        } else if (marketingCookies) {
            AddMarketingCookies();
        }
        
    }
    const AddMarketingCookies = () => {
        setCookie("marketing", "true", 30);
    }

    const AddAnalyticsCookies = () => {
        setCookie("analytics", "true", 30);
    }


</script>
{#if visible}
<div class="preventClick">
    <div class="allContent">
        <div class="coockieBox">
            <div class="coockieContent">
                <h1>Cookies</h1>
                <p>We use cookies to give you a better experience on our site. By continuing to use our website, you accept the use of cookies.</p>
                <div class="cookieButtons">
                    <button class="cookieButton cookieBlue" on:click={cookiesAccept}>Accept</button>
                    <button class="cookieButton cookieGray" on:click={cookiesCustom}>Customize</button>            
                    <button class="cookieButton cookieGray" on:click={nessesary}>Necessary</button>
                </div>
            </div>
            <img src="/Images/coockieCoockies.png" alt="">
        </div>
    </div>
</div>
{/if}
{#if custom}
<div class="customBackground">
    <div class="allCustom">
        <div class="boxCustom">
            <h1 class="customText">Cookie Preferences</h1>
            <p class="customText">Choose which cookies you want to accept:</p>
            <div class="cookieOptions">
                <label>
                    <input type="checkbox" bind:checked={necessaryCookies} disabled>
                    Necessary Cookies (always enabled)
                </label>
                <label>
                    <input type="checkbox" bind:checked={analyticsCookies}>
                    Analytics Cookies
                </label>
                <label>
                    <input type="checkbox" bind:checked={marketingCookies}>
                    Marketing Cookies
                </label>
            </div>
            <button class="cookieButton cookieBlue" on:click={removeCostom}>Save Preferences</button>
        </div>
    </div>
</div>
{/if}
<style>
/* Cutsom cookie */ 
.boxCustom {
    background-color: var(--background);
    padding: 50px;
    border-radius: 26px;
}

label {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
    }

input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #4CAF50;
}

.customText {
    color: var(--primary-text);
    margin-bottom: 1rem;
}
    
.cookieOptions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 0.5rem;
    color: var(--secondary-text);
}

.allCustom {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    animation: slide 0.5s;
    z-index: 10000;
}

.customBackground {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);    
    z-index: 10000;
}


/*     coockie buttons  */
    .cookieButton {
        border: none;
        padding: 0.5rem 5px;
        border-radius: 5px;
        cursor: pointer;
        color: var(--border-divider);
        transition: transform 0.3s;
/*         animation: buttonFlash 1s 2s infinite; */
    }

    @keyframes buttonFlash {
        0% {
            color: blue;
        }
        50% {
            color: red;
        }
        100% {
            color: blue;
        }
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
    /* Prevents the user from clicking on the page */
    .preventClick {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000000;
    }
</style>