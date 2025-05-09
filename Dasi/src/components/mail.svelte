<script>
    let data = []; // Array to store fetched email addresses
    let subject = 'Ikke si dette til noen'; // Email subject
    let text = 'daniel liker barn'; // Plain text body
    let html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd;">
      <thead>
        <tr>
          <th style="background-color: #0078d4; color: #fff; padding: 20px; text-align: center; font-size: 24px;">
            Welcome to Our Service
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 20px;">
            <p style="margin: 0 0 10px;">Dear [Recipient's Name],</p>
            <p style="margin: 0 0 10px;">
              Thank you for choosing our service. We are excited to have you on board and look forward to helping you achieve your goals.
            </p>
            <p style="margin: 0 0 10px;">
              If you have any questions or need assistance, please don't hesitate to reach out to our support team.
            </p>
            <p style="margin: 0 0 10px;">
              Best regards,<br>
              The [Your Company Name] Team
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">[Your Company Name] | [Your Address] | [Contact Info]</p>
            <p style="margin: 0;">&copy; 2023 [Your Company Name]. All rights reserved.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`;

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
<div class="buttonsMail">
    <button class="button purple" on:click={getNewsEmails}>Fetch Emails</button>
    <button class="button purple" on:click={sendMails}>Send Mails</button>
</div> 

<style>
    .buttonsMail {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        height: 100vh;
        
    }
</style>