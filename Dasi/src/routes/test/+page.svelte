<script lang="ts">
    import EditChat from "../../components/chat/edit-chat.svelte";

    function handleEvent(event:CustomEvent) {
        console.log(event.type);
    }
</script>

<EditChat on:delete={handleEvent} on:share={handleEvent} on:exit={handleEvent}/>