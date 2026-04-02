import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const { orderId } = useParams(); // route like /thank-you/:orderId
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
// ✅ Define verifyPayment inside the page
  const verifyPayment = async () => {
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      setStatus(data.status); // "success", "pending", "failed"
    } catch (err) {
      setStatus("failed");
    }
  };
// ✅ Call immediately after mount
  useEffect(() => {
    verifyPayment();
  }, [orderId]);

 useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setStatus(data.status); // "success", "pending", "failed"
      } catch (err) {
        console.error("Error fetching order status:", err);
        setStatus("error");
      }
    };

    fetchStatus();

    // Optional: poll every 5s until status changes
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
   let timer: NodeJS.Timeout | undefined;

    if (status === "success" || status === "completed") {
      // Show success page, then auto‑redirect to cart after 3s
      timer = setTimeout(() => navigate("/cart"), 8080);
    } else if (status === "pending") {
      navigate(`/order-processing/${orderId}`);
    } else if (status === "failed") {
      navigate(`/order-failed/${orderId}`);
    }
   // ✅ cleanup always at the end
     return () => {
        if (timer) clearTimeout(timer);
      };
    }, [status, orderId, navigate]);



  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "loading" && <p>⏳ Processing your payment...</p>}
      {status === "error" && <p>❌ Error checking payment status.</p>}
      {status === "success" && <p>🎉 Payment successful! Redirecting to cart...</p>}
      {status === "pending" && <p>⌛ Payment is pending, please wait...</p>}
      {status === "failed" && <p>❌ Payment failed. Please try again.</p>}
    </div>
  );
};

export default ThankYouPage;
