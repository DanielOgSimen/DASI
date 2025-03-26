<script lang="ts">
    import { user } from "../../store/userStore";
    import InputPromt from "../../components/input-promt.svelte";
    import Choice from "../../components/choice.svelte";

    let userData: any;
    user.subscribe(value => {
        userData = value;
    });
    console.log(userData);

    let nameList: string[] = [];
    if (userData && userData.name) {
        nameList = userData.name.split(" ");
    }

    let firstName = nameList.slice(0, -1).join(" ") || "";
    let lastName = nameList[nameList.length - 1] || "";

    let page = 1;
    let totalPages = 5;

    const questions = [
        '<span class="accent-blue">CREATE</span> YOUR<br> USER WITH <br><span class="accent-blue">DASI</span>-GPT',
        'WHAT ARE <span class="accent-blue">YOU</span><br> USING <span class="accent-blue">DASI</span><br>FOR?',
        '<span class="accent-blue">HOW</span> DID YOU<br>HEAR <span class="accent-blue">ABOUT</span><br>US?',
        "What are you looking for?",
        "What are you looking for?"
    ]

    const whyChoices = {
        school: {
            text: "School",
            icon: '<ion-icon name="school-outline"></ion-icon>'
        },
        work: {
            text: "Work",
            icon: '<ion-icon name="briefcase-outline"></ion-icon>'
        },
        personal: {
            text: "Personal",
            icon: '<ion-icon name="person-outline"></ion-icon>'
        },
        other: {
            text: "Other",
            icon: '<ion-icon name="ellipsis-horizontal-outline"></ion-icon>'
        }
    }

    const howDidYouFindUs = {
        google: {
            text: "Google",
            icon: '<ion-icon name="logo-google"></ion-icon>'
        },
        friend: {
            text: "Friend",
            icon: '<ion-icon name="people-outline"></ion-icon>'
        },
        socialMedia: {
            text: "Social Media",
            icon: '<ion-icon name="chatbubble-outline"></ion-icon>'
        },
        ads: {
            text: "Ads",
            icon: '<ion-icon name="newspaper-outline"></ion-icon>'
        },
        other: {
            text: "Other",
            icon: '<ion-icon name="ellipsis-horizontal-outline"></ion-icon>'
        }
    };

    let selectedWhy = "";
</script>

<div class="body">
{#if !userData.picture}
    <div class="not-logged-in"><p class="text">Looks like you're not logged in</p><a href="/loggInn"><button class="button purple">Log in</button></a></div>
{:else}
    <div class="big-box">
        <div class="question-box">
            <h1 class="question">
                {@html questions[page - 1]}
            </h1>
        </div>
        <div class="box">
            <div class="main" style="width: {totalPages*100}%; left: {-(page-1)*100}%">
                <div class="info-page first" style="width: {100/totalPages}%">
                    <div class="top">
                        <img src="/Images/logo.svg" alt="Dasi" class="logo">
                    </div>
                    <h1 class="text medium">Create User</h1>
                    <div class="names">
                        <InputPromt label="First Name" HideSvg={true} labelClass="noLabelAnimation" Width="10rem" value={firstName} onEnter={() => {}} />
                        <InputPromt label="Last Name" HideSvg={true} labelClass="noLabelAnimation" Width="9rem" value={lastName} onEnter={() => {}} />
                    </div>
                    <InputPromt label="Email" HideSvg={true} labelClass="noLabelAnimation" value={userData.email} onEnter={() => {}}/>
                </div>
                <div class="info-page second" style="width: {100/totalPages}%">
                    <div class="top">
                        <img src="/Images/logo.svg" alt="Dasi" class="logo">
                    </div>
                    <div class="why-choices">
                        {#each Object.values(whyChoices) as why}
                            <Choice 
                                text={why.text} 
                                icon={why.icon} 
                                group="why" 
                                selected={selectedWhy === why.text}
                                on:change={(e: CustomEvent) => selectedWhy = e.detail}
                            />
                        {/each}
                    </div>
                </div>
            </div>
            <div class="page-buttons">
                {#if page > 1}
                    <button class="button purple" on:click={() => { page -= 1 }}>Previous Page</button>
                {/if}
                {#if page < totalPages}
                    <button class="button purple" on:click={() => { page += 1 }}>Next Page</button>
                {/if}
            </div>
        </div>
    </div>
{/if}
</div>

<style>
    .question-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .question {
        font-size: 38px;
        font-weight: 500;
        line-height: 70px;
    }
    .big-box {
        width: 60vw;
        background-color: var(--background);
        border-radius: 26px;
        overflow: hidden;
        display: flex;
    }
    .text {
        color: var(--primary-text);
        font-size: 1.5rem;
    }
    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: var(--accent-gradient);
    }
    .not-logged-in {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        flex-direction: column;
        gap: 20px;
        background-color: var(--border-divider);
        width: 100vw;
        max-width: 500px;
        border-radius: 26px;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
        flex-direction: row;
        gap: 20px;
        background-color: var(--border-divider);
        width: 100vw;
        max-width: 500px;
        position: relative;
        overflow: hidden;
    }

    .page-buttons {
        justify-self: flex-end;
        position: absolute;
        bottom: 10vh;
    }

    .main {
        position: absolute;
        transition: left 0.5s;
        height: 100%;
        bottom: 50px;
        display: flex;
    }

    .logo {
        height: 100px;
    }

    .info-page {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        gap: 20px;
    }

    .names {
        display: flex;
        gap: 20px;
    }

    .why-choices {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
</style>