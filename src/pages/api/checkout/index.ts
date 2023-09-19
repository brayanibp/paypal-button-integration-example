import paypal from '@paypal/checkout-server-sdk';
import { NextApiResponse, NextApiRequest } from 'next';

const clientID = process.env.CLIENT_ID;

const clientSecret = process.env.CLIENT_SECRET_ID;

const environment = new paypal.core.SandboxEnvironment(clientID, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "200.00",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "200.00"
            }
          }
        },
        items: [
          {
            // category: "DONATION",
            name: "Example product",
            description: "An example",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "100.00"
            }
          },
          {
            // category: "DONATION",
            name: "Example product 2",
            description: "An example",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "100.00"
            }
          }
        ]
      }
    ]
  });

  const response = await client.execute(request);
  // console.log(`${JSON.stringify(response)}`);
  // console.log(`Order: ${JSON.stringify(response.result)}`);
  return {
    id: response.result.id
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') return res.status(200).json({ id: (await POST()).id });
};