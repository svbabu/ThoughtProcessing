import React, { useState, useEffect } from "react";
import startNetBankingPayment from "./startNetBankingPayment"; // service for backend call
import openRazorpayCheckout from "./openRazorpayCheckout"; // adjust path as needed



interface PaymentButtonProps {
  total: number;
   selectedBank: string;
   selectedPayment: string; // 👈 add this
   razorpayOrderId: string; // 👈 add this

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

const PaymentButton: React.FC<PaymentButtonProps> = ({ total, selectedBank, selectedPayment,razorpayOrderId}) => {
const [loading, setLoading] = useState(false);
  const handlePayment = async () => {// <-- mark as async
       if (!selectedPayment) {
            alert("Please select a payment method before proceeding");
            return;
          }
          if (selectedPayment === "netbanking" && !selectedBank) {
            alert("Please select a bank before proceeding");
            return;
          }
      setLoading(true);
      try {
           const amountInPaise = Math.round(total * 100);

                const options = {
                  key: "rzp_test_Rpsv98lSsdaw71",
                  amount: amountInPaise,
                  currency: "INR",
                  order_id: razorpayOrderId, // ✅ reuse existing orderId
                  name: "ThoughtProcessing",
                  description: "Netbanking Payment",
                  method: { netbanking: true },
                  handler: function(response: any) {
                    console.log("Payment success:", response);
                    console.log("orderId =", response.razorpay_order_id);
                    console.log("paymentId =", response.razorpay_payment_id);
                    console.log("signature =", response.razorpay_signature);
                    // verify with backend
                    fetch("http://localhost:8081/api/payments/verify", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                  }),
                                })
                            .then(res => {
                            console.log("Verify API Status:", res.status);
                            return res.text();
                            })
                        .then(data => {
                        console.log("Verify API Response:", data);
                        })
                              },
                              theme: { color: "#3399cc" },
                            };

                            const rzp = new (window as any).Razorpay(options);
                            rzp.open();

        /*    // ✅ Convert to paise
                const amountInPaise = Math.round(total * 100);

                // ✅ Call backend to create order (service handles API only)
                const orderData = await startNetBankingPayment(selectedBank, amountInPaise);

                // ✅ Pass orderId + amount + selectedPayment into checkout utility
                openRazorpayCheckout(orderData.orderId, total, selectedPayment); */
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