// components/PayPalCheckout.tsx
"use client";

import { createOrderFromCart } from "@/actions/order.action";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import toast from "react-hot-toast";

interface PayPalCheckoutProps {
  total: number;
  selectedCartItemIds: string[];
}

export default function PayPalCheckout({ total, selectedCartItemIds }: PayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
          description: `Farm Market Order`,
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);


    try {
      await createOrderFromCart(selectedCartItemIds);
      toast.success("Order created successfully!");
    } catch (error) {
      toast.error("Failed to create order.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }

    try {
      const order = await actions.order.get();
      const payerName = order.payer?.name?.given_name || "";
      const payerEmail = order.payer?.email_address || "";

      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: total.toFixed(2),
        orderID: data.orderID,
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Payment processing failed");
      }

      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Payment failed:", error);
      setPaypalError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    setPaypalError("An error occurred with PayPal. Please try again.");
  };

  return (
    <div>
      {isProcessing && (
        <div className="mb-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
          <span>Processing your payment...</span>
        </div>
      )}

      {paypalError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {paypalError}
        </div>
      )}

      <div className="border rounded-2xl p-4 shadow-sm bg-white">
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            currency: "USD",
            intent: "capture",
          }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: "vertical" }}
            disabled={isProcessing}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
