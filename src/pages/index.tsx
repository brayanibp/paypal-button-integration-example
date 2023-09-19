"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Home() {
  return (
    <main
      className="bg-slate-950 flex justify-center items-center px-0 py-10 h-fit"
    >
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string }}>
        <PayPalButtons
          style={{
            color: "silver",
            layout: "vertical",
            label: "pay"
          }}
          createOrder={async ()=>{
            const response = await fetch('/api/checkout', {
              method: "POST"
            });
            const order = await response.json();
            return order.id;
          }}
          onApprove={async (order, actions)=>{
            console.log(order);
            await actions.order?.capture();
          }}
          onCancel={(data, actions)=>{
            console.log(data);
            actions.redirect();
          }}
        ></PayPalButtons>
      </PayPalScriptProvider>
    </main>
  )
}
