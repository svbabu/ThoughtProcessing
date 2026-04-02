import React, { useState, useEffect } from "react";


// services/paymentService.ts
 const startNetBankingPayment = async (bank: string, amount: number) => {
try {
  const res = await fetch("http://localhost:8081/api/payments/netbanking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bank, amount })
  });
if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend error: ${res.status} - ${errorText}`);
    }
  return res.json();
  }
 catch (err) {
       console.error("Payment service error:", err);
       throw err;
     }
};

export default startNetBankingPayment;