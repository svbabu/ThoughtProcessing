import React, { useState, useEffect } from "react";
import startNetBankingPayment from "./startNetBankingPayment"; // service for backend call
import openRazorpayCheckout from "./openRazorpayCheckout"; // adjust path as needed



interface PaymentButtonProps {
  total: number;
   selectedBank: string;
   selectedPayment: string; // 👈 add this




}
const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ total, selectedBank, selectedPayment}) => {
const [loading, setLoading] = useState(false);
  const handlePayment = async () => {   // <-- mark as async
      setLoading(true);
      try {
           // ✅ Convert to paise
                const amountInPaise = Math.round(total * 100);

                // ✅ Call backend to create order (service handles API only)
                const orderData = await startNetBankingPayment(selectedBank, amountInPaise);

                // ✅ Pass orderId + amount + selectedPayment into checkout utility
                openRazorpayCheckout(orderData.orderId, total, selectedPayment);
      }
   catch (error) {
     console.error("Payment initiation failed:", error);
     alert("Something went wrong while initiating payment.");
   }
finally {
      setLoading(false);
    }
     };

    return (
        <button onClick={handlePayment} disabled={!selectedBank || loading}>
          {loading ? "Processing..." : `Pay ₹${total}`}
        </button>
        );
    /*  return (
            <button onClick={onPay} disabled={!selectedBank || loading}>
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
            ); */
       };



   export default PaymentButton;