import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";

//This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_6565216a17c2d66ab8b46b3ca3dc00d70373b0ff9e53c474dc151b48578ce2a0";

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log(data);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        }) 
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};
//command : 'stripe login'
// Your pairing code is: winner-hooray-gains-enrapt
// This pairing code verifies your authentication with Stripe.
// The Stripe CLI is configured for test-ecommerce with account id acct_1PMF3LKvRtngsnaB
//Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.
// Ready! You are using Stripe API Version [2024-04-10]. Your webhook signing secret is whsec_6565216a17c2d66ab8b46b3ca3dc00d70373b0ff9e53c474dc151b48578ce2a0
// we are using 'stripe listen --forward-to localhost:3001/api/webhook' as our endpoint.