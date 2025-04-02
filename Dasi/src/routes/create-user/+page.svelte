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

    let page = 1;
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
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><polygon points="32 192 256 64 480 192 256 320 32 192" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 240 112 368 256 448 400 368 400 240" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="480" y1="368" x2="480" y2="192" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="256" y1="320" x2="256" y2="448" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>'
        },
        work: {
            text: "Work",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="32" y="128" width="448" height="320" rx="48" ry="48" style="fill:none;stroke-linejoin:round;stroke-width:32px"/><path d="M144,128V96a32,32,0,0,1,32-32H336a32,32,0,0,1,32,32v32" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="480" y1="240" x2="32" y2="240" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M320,240v24a8,8,0,0,1-8,8H200a8,8,0,0,1-8-8V240" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>'
        },
        personal: {
            text: "Personal",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/></svg>'
        },
        other: {
            text: "Other",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><circle cx="416" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><circle cx="96" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/></svg>'
        }
    }

    const howDidYouFindUs = {
        google: {
            text: "Google",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z"/></svg>'
        },
        friend: {
            text: "Friend",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M402,168c-2.93,40.67-33.1,72-66,72s-63.12-31.32-66-72c-3-42.31,26.37-72,66-72S405,126.46,402,168Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M336,304c-65.17,0-127.84,32.37-143.54,95.41-2.08,8.34,3.15,16.59,11.72,16.59H467.83c8.57,0,13.77-8.25,11.72-16.59C463.85,335.36,401.18,304,336,304Z" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><path d="M200,185.94C197.66,218.42,173.28,244,147,244S96.3,218.43,94,185.94C91.61,152.15,115.34,128,147,128S202.39,152.77,200,185.94Z" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M206,306c-18.05-8.27-37.93-11.45-59-11.45-52,0-102.1,25.85-114.65,76.2C30.7,377.41,34.88,384,41.72,384H154" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>'
        },
        socialMedia: {
            text: "Social Media",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M87.49,380c1.19-4.38-1.44-10.47-3.95-14.86A44.86,44.86,0,0,0,81,361.34a199.81,199.81,0,0,1-33-110C47.65,139.09,140.73,48,255.83,48,356.21,48,440,117.54,459.58,209.85A199,199,0,0,1,464,251.49c0,112.41-89.49,204.93-204.59,204.93-18.3,0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09,31.09,0,0,0-11.12-2.07,30.71,30.71,0,0,0-12.09,2.43L81.51,462.78A16,16,0,0,1,76.84,464a9.6,9.6,0,0,1-9.57-9.74,15.85,15.85,0,0,1,.6-3.29Z" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>'
        },
        ads: {
            text: "Ads",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M368,415.86V72a24.07,24.07,0,0,0-24-24H72A24.07,24.07,0,0,0,48,72V424a40.12,40.12,0,0,0,40,40H416" style="fill:none;stroke-linejoin:round;stroke-width:32px"/><path d="M416,464h0a48,48,0,0,1-48-48V128h72a24,24,0,0,1,24,24V416A48,48,0,0,1,416,464Z" style="fill:none;stroke-linejoin:round;stroke-width:32px"/><line x1="240" y1="128" x2="304" y2="128" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="240" y1="192" x2="304" y2="192" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="112" y1="256" x2="304" y2="256" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="112" y1="320" x2="304" y2="320" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="112" y1="384" x2="304" y2="384" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M176,208H112a16,16,0,0,1-16-16V128a16,16,0,0,1,16-16h64a16,16,0,0,1,16,16v64A16,16,0,0,1,176,208Z"/></svg>'
        },
        other: {
            text: "Other",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><circle cx="416" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/><circle cx="96" cy="256" r="32" style="fill:none;stroke-miterlimit:10;stroke-width:32px"/></svg>'
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