<script lang="ts">
    import { onMount } from 'svelte';
  
    interface Item {
      name: string;
      quantity: number;
      price: number;
    }
  
    let sessionId: string | null = ''; // Allow sessionId to be null initially
    let orderNumber = '';
    let orderDate = '';
    let customerEmail = '';
    let items: Item[] = [];
    let totalAmount = 0;
  
    onMount(async () => {
      // Fetch the session ID from the URL or some other source
      const urlParams = new URLSearchParams(window.location.search);
      sessionId = urlParams.get('session_id');
  
      if (sessionId) {
        const response = await fetch(`/api/session/${sessionId}`);
        const session = await response.json();
  
        orderNumber = session.id;
        orderDate = new Date(session.created * 1000).toLocaleDateString();
        customerEmail = session.customer_details.email;
        items = session.line_items.data.map((item: any) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total / 100,
        }));
        totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    });
  </script>
  
  <h1>Order Received</h1>
  <p>Thank you for your purchase! Your order has been received and is now being processed. You will receive an email with the details of your purchase shortly.</p>
  
  <div class="order-details">
    <h2>Order Details</h2>
    <p><strong>Order Number:</strong> {orderNumber}</p>
    <p><strong>Order Date:</strong> {orderDate}</p>
    <p><strong>Email:</strong> {customerEmail}</p>
  
    <h3>Items Ordered</h3>
    <ul>
      {#each items as item}
        <li>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</li>
      {/each}
    </ul>
  
    <p><strong>Total Amount:</strong> ${totalAmount}</p>
  </div>
  
  <style>
    h1 {
      margin-top: 120px;
      text-align: center;
    }
  
    .order-details {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      max-width: 600px;
      margin: 20px auto;
    }
  
    .order-details h2, .order-details h3 {
      margin-top: 0;
    }
  
    .order-details p, .order-details ul {
      margin: 10px 0;
    }
  
    .order-details ul {
      list-style-type: none;
      padding: 0;
    }
  
    .order-details li {
      margin: 5px 0;
    }
  </style>