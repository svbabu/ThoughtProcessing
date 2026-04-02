import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderProcessingPage = () => {
  const { orderId } = useParams(); // assumes route like /order-processing/:orderId
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setStatus(data.status);
      } catch (err) {
        console.error("Error fetching order status:", err);
      }
    };

    fetchStatus();

    // Poll every 5 seconds until status changes
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    if (status === "success" || status === "completed") {
      window.location.href = `/order-success?order_id=${orderId}`;
    } else if (status === "failed") {
      window.location.href = `/order-failed?order_id=${orderId}`;
    }
    // If still "pending", stay here and keep polling
  }, [status, orderId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="spinner" style={{ fontSize: "24px" }}>
        ⏳
      </div>
      <p>Your payment is being processed. Please wait...</p>
    </div>
  );
};

export default OrderProcessingPage;
