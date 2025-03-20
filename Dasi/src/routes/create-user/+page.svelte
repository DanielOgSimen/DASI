<script lang="ts">
    import { user } from "../../store/userStore";
    import InputPromt from "../../components/input-promt.svelte";

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
</script>

<div class="body">
{#if !userData.picture}
    <div class="not-logged-in"><p class="text">Looks like you're not logged in</p><a href="/loggInn"><button class="button purple">Log in</button></a></div>
{:else}
    <div class="box">
        <div class="main" style="width: {totalPages*100}%; left: {-(page-1)*100}%">
            <div class="info-page" style="width: {100/totalPages}%">
                <h1 class="text">Create User</h1>
                <div class="names">
                    <InputPromt label="First Name" HideSvg={true} labelClass="noLabelAnimation" Width="10rem" value={firstName} onEnter={() => {}} />
                    <InputPromt label="Last Name" HideSvg={true} labelClass="noLabelAnimation" Width="9rem" value={lastName} onEnter={() => {}} />
                </div>
                <InputPromt label="Email" HideSvg={true} labelClass="noLabelAnimation" value={userData.email} onEnter={() => {}}/>
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
{/if}
</div>

<style>
    .text {
        color: var(--primary-text);
        font-size: 1.5rem;
    }
    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
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
        flex-direction: column;
        gap: 20px;
        background-color: var(--border-divider);
        width: 100vw;
        max-width: 500px;
        border-radius: 26px;
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
</style>