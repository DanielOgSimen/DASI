<script>
    import Mail from "../../components/mail.svelte";
    import { user } from "../../store/userStore";

    export let data;

    const { DANIEL_DASI_ID, SIMEN_DASI_ID } = data;
</script>

<h1>DASHBOARD</h1>
{#if $user.dasiId === DANIEL_DASI_ID || $user.dasiId === SIMEN_DASI_ID}
    <Mail />
{/if}
