import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';


export async function POST({ request }) {
    const { to, subject, text, html } = await request.json(); // Extract email details from the request body

    // Create a transporter with correct Gmail SMTP settings
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Correct Gmail SMTP host
        port: 587, // Port for TLS
        secure: false, // Use STARTTLS
        auth: {
            user: env.SMTP_USER, // Use environment variable for SMTP user
            pass: env.SMTP_PASS, // Use environment variable for SMTP password or App Password
        },
    });

    try {
        // Send the email
        const info = await transporter.sendMail({
            from: 'dasigpt@gmail.com', // Sender address
            to: to, // Recipient address
            subject: subject, // Subject line
            text: text, // Plain-text body
            html: html, // HTML body
        });

        console.log("Message sent:", info.messageId);

        // Return a success response
        return new Response(
            JSON.stringify({ message: 'Email sent successfully',to }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Error sending email:", error);

        // Return an error response
        return new Response(
            JSON.stringify({ error: 'Failed to send email'}),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
