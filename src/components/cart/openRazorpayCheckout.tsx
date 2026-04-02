import React from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}
/**
 * Open Razorpay Checkout for any payment method
 * @param orderId - Razorpay order_id from backend
 * @param amount - total amount in rupees
 * @param selectedPayment - chosen payment method (upi, netbanking, card, wallet)
 */
const openRazorpayCheckout= (
                            orderId: string,
                            amount: number,
                            selectedPayment: string="upi" // 👈 optional parameter
                          ) => {
                              const method = selectedPayment || "upi";   // default to UPI if not provided
                              const options = {
        key: "rzp_test_Rpsv98lSsdaw71", // use your Test Key ID
        amount: amount * 100,           // amount in paise
        currency: "INR",
        name: "ThoughtProcessing",
        description: `${method} Payment`,
        order_id:orderId,              // Razorpay order_id from backend
        handler: function (response: any) {
          console.log("Payment success:", response);
    // ✅ Send to backend for signature verification
      fetch("http://localhost:8081/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           razorpay_order_id:response.razorpay_order_id,
           razorpay_payment_id: response.razorpay_payment_id,
           razorpay_signature: response.razorpay_signature,
        }),
      })
        .then((res) => res.json())
        .then((verifyData) => {
            const orderId = response.razorpay_order_id || options.order_id;
          if (verifyData.status === "success") {
              window.location.href = "/order-success?order_id=" + orderId;
          } else if (verifyData.status === "pending") {
            window.location.href = "/order-processing?order_id=" + orderId;
          } else {
            window.location.href = "/order-failed?order_id=" + orderId;
          }
        });
    },
 // 👇 Dynamically restrict to chosen method
    method: {
      upi: selectedPayment === "upi",
      netbanking: selectedPayment === "netbanking",
      card: selectedPayment === "card",
      wallet: selectedPayment === "wallet",
    },
theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open(); // 👈 This opens the Razorpay Checkout modal
};
export default openRazorpayCheckout;

