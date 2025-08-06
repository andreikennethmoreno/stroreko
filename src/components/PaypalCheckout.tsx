// components/PayPalCheckout.tsx
"use client";

import { createOrderFromCart } from "@/actions/order.action";
import { hasShippingAddress } from "@/actions/address.action"; // Adjust import path as needed
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import AddressViewDialog from "./AddressViewDialog"; // Adjust import path as needed
import { AlertTriangle } from "lucide-react";

interface PayPalCheckoutProps {
  total: number;
  selectedCartItemIds: string[];
}

export default function PayPalCheckout({
  total,
  selectedCartItemIds,
}: PayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const [hasAddress, setHasAddress] = useState<boolean | null>(null);
  const [isCheckingAddress, setIsCheckingAddress] = useState(true);

  // Function to check for shipping address
  const checkAddress = useCallback(async () => {
    setIsCheckingAddress(true);
    try {
      const addressExists = await hasShippingAddress();
      setHasAddress(addressExists);
    } catch (error) {
      console.error("Error checking shipping address:", error);
      setHasAddress(false);
    } finally {
      setIsCheckingAddress(false);
    }
  }, []);

  // Check for shipping address on component mount
  useEffect(() => {
    checkAddress();
  }, [checkAddress]);

  // Callback function to handle address changes
  const handleAddressChange = useCallback(() => {
    checkAddress(); // Recheck address status when addresses are modified
  }, [checkAddress]);

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

  // Show loading state while checking address
  if (isCheckingAddress) {
    return (
      <div className="border rounded-2xl p-4 shadow-sm bg-white">
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
          <span>Checking shipping information...</span>
        </div>
      </div>
    );
  }

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

      <div className="border rounded-2xl p-4 shadow-sm ">
        {hasAddress ? (
          // Show PayPal buttons if shipping address exists
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
        ) : (
          // Show address requirement notice and dialog if no shipping address
          <div className="text-center py-6 space-y-4">
            <div className="flex items-center justify-center text-amber-600 mb-3">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Shipping Address Required</span>
            </div>

            <p className="text-sm  mb-4">
              Please add a shipping address before proceeding with checkout.
            </p>

            <AddressViewDialog onAddressChange={handleAddressChange} />

            <p className="text-xs  mt-2">
              You'll be able to complete your purchase once a shipping address
              is added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
