<script>
    let data = []; // Array to store fetched email addresses
    let subject = 'Ikke si dette til noen'; // Email subject
    let text = 'daniel liker barn'; // Plain text body
    let html = ''; // HTML body (optional)

    async function getNewsEmails() {
        try {
            const response = await fetch('/api/newsletter/getEmails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            data = result.message || []; // Assign the "message" array to "data"
            console.log(data); // Log the fetched email addresses
        } catch (error) {
            console.error("There was an error fetching the emails", error);
        }
    }

    async function sendMails() {
        if (data.length === 0) {
            console.error("No email addresses available to send emails.");
            return;
        }

        try {
            const response = await fetch('/api/newsletter/sendMails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: data, // Send emails to all addresses in the "data" array
                    subject,
                    text,
                    html
                })
            });
            const statusSendMail = await response.json();
            console.log(statusSendMail);
        } catch (error) {
            console.error("There was an error sending the mails", error);
        }
    }
</script>

<button class="button purple" on:click={getNewsEmails}>Fetch Emails</button>
<button class="button purple" on:click={sendMails}>Send Mails</button>