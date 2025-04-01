<script lang="ts">
    import { user } from "../../store/userStore";
    import InputPromt from "../../components/input-promt.svelte";
    import Choice from "../../components/choice.svelte";
    import Newsletter from "../../components/newsletter.svelte";

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

    let page = 4;
    let totalPages = 4;

    const questions = [
        '<span class="accent-blue">CREATE</span> YOUR<br> USER WITH <br><span class="accent-blue">DASI</span>-GPT',
        'WHAT ARE <span class="accent-blue">YOU</span><br> USING <span class="accent-blue">DASI</span><br>FOR?',
        '<span class="accent-blue">HOW</span> DID YOU<br>HEAR <span class="accent-blue">ABOUT</span><br>US?',
        'FEEL FREE TO <span class="accent-blue">SUBSCRIBE</span><br>TO OUR <span class="accent-blue">NEWSLETTER</span><br>TO <span class="accent-blue">STAY UPDATED</span>',
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

    async function generateID() {
        try {
            const response = await fetch('/api/database/user/generate-id', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData.id, // Sett riktig userID
                    method: userData.method
                })
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            user.update(currentUser => ({
                ...currentUser,
                dasiId: data.id
            }));
            console.log('Generate API Response:', data);
        } catch (error) {
            console.error('Error getting data:', error);
        }
    }
    async function saveData() {
        try {
            const response = await fetch('/api/database/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userData.dasiId,
                    name: userData.name,
                    email: userData.email,
                    imageUrl: userData.picture
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            console.log(userData.dasiId)
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    async function getID() {
        try {
            const response = await fetch('/api/database/user/get-id', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData.id, 
                    method: userData.method
                })
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            user.update(currentUser => ({
                ...currentUser,
                dasiId: data.id
            }));
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error getting data:', error);
        }
    }
    async function signIn() {
        console.log(userData.dasiId)
        console.log("Signing in...");
        console.log("Generating ID");
        await generateID()
        console.log("Id Generated");
        console.log("Getting Dasi ID");
        await getID()
        console.log("Dasi ID: " + userData.dasiId);
        console.log("Saving data");
        await saveData()
        console.log("Data saved");
    }
</script>

<div class="body">
{#if !userData.picture}
    <div class="not-logged-in"><p class="text">Looks like you're not logged in</p><a href="/loggInn"><button class="button purple">Log in</button></a></div>
{:else}
    <div class="big-box">
        <div class="pagenr"><span class="accent-blue">{page}</span>/{totalPages}</div>
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
                    <h1 class="text medium">What are you using us for?</h1>
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
                <div class="info-page third" style="width: {100/totalPages}%">
                    <div class="top">
                        <img src="/Images/logo.svg" alt="Dasi" class="logo">
                    </div>
                    <h1 class="text medium">How did you find us?</h1>
                    <div class="why-choices">
                        {#each Object.values(howDidYouFindUs) as why}
                            <Choice 
                                text={why.text} 
                                icon={why.icon} 
                                group="find" 
                                selected={selectedWhy === why.text}
                                on:change={(e: CustomEvent) => selectedWhy = e.detail}
                            />
                        {/each}
                    </div>
                </div>
                <div class="info-page fourth" style="width: {100/totalPages}%">
                    <div class="top">
                        <img src="/Images/logo.svg" alt="Dasi" class="logo">
                    </div>
                    <div class="news-letter">
                        <Newsletter />
                    </div>
                </div>
            </div>
            <div class="page-buttons">
                {#if page > 1}
                    <button class="button purple" on:click={() => { page -= 1 }}>Previous Page</button>
                {/if}
                {#if page < totalPages}
                    <button class="button purple" on:click={() => { page += 1 }}>Next Page</button>
                {:else}
                    <button class="button purple" on:click={() => { signIn() }}>Sign Up</button>
                {/if}
            </div>
        </div>
    </div>
{/if}
</div>

<style>
    .pagenr {
        margin: 20px;
        font-weight: 400;
    }
    .news-letter {
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
        color: var(--primary-text);
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
        height: 70vh;
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

    @media (max-width: 1500px) {
        .question {
            font-size: 28px !important;
            line-height: 50px;
        }
        .logo {
            height: 80px;
        }
    }

    @media (max-width: 1400px) {
        .question {
            font-size: 24px !important;
            line-height: 40px;
        }
        .logo {
            height: 70px;
        }
    }
    @media (max-width: 1300px) {
        .question {
            font-size: 22px !important;
            line-height: 40px;
        }
        .logo {
            height: 70px;
        }
    }

    @media (max-width: 1200px) {
        .question {
            font-size: 20px !important;
            line-height: 40px;
        }
        .logo {
            height: 70px;
        }
    }
    @media (max-width: 1100px) {
        .question {
            font-size: 20px !important;
            line-height: 30px;
        }

        .question-box {
            display: none;
        }
        .big-box {
            flex-direction: column;
            background-color: transparent;
            justify-content: center;
            align-items: center;
        }

        .box {
            width: 60vw !important;
            border-radius: 26px;
        }
        
        .main .info-page {
            width: 100%;
        }
        .logo {
            height: 60px;
        }
    }
    @media (max-width: 800px) {
        .question {
            font-size: 18px !important;
            line-height: 30px;
        }
    }
    @media (max-width: 600px) {
        .question {
            font-size: 16px !important;
            line-height: 30px;
        }
        .big-box {
            width: 90vw;
        }
        .box .main {
            width: 90vw;
        }
    }
    @media (max-width: 400px) {
        .question {
            font-size: 14px !important;
            line-height: 30px;
        }
        .big-box {
            width: 95vw;
        }
        .box {
            width: 95vw;
        }
    }
</style>