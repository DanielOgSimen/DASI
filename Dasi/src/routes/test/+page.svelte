<script>
    async function data() {
        try {
            const response = await fetch("/api/database/user/user-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 4,
                    where: "Sondre",
                    why: "Mathias",
                }),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
</script>

<button on:click={data}>oppdater database</button>