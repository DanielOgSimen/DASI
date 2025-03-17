import { stripe } from '../../stripe'; // Ensure this path is correct and the module exists
import type { RequestHandler } from '@sveltejs/kit'; // Import the RequestHandler type from SvelteKit

// Define the GET request handler
export const GET: RequestHandler = async ({ params }) => {
  const sessionId = params.id; // Get the session ID from the URL parameters

  try {
    // Retrieve the session details from Stripe, expanding line_items and customer details
    const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
      expand: ['line_items', 'customer'],
    });

    // Return the session details with a 200 status code
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Return an error message with a 500 status code if something goes wrong
    return new Response(JSON.stringify({ error: 'Failed to retrieve session details' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};