<script>

    async function getNewsEmails () {
        try {
            const response = await fetch('/api/newsletter/getEmails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error ("there was an error fetching the emails", error)
        }};

</script>
<button class="button purple" on:click={getNewsEmails}>Fetch Emails</button>