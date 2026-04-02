import React, { useState, useEffect } from "react";
import googlepay from '@img/googlepay.png';
import phonepe from '@img/phonepe.png';
import paytm from '@img/paytm.png';
import amazonpay from '@img/amazonpay.png';

import cod from '@img/cod.png';
import startNetBankingPayment from '@cart/startNetBankingPayment';
import PaymentButton from '@cart/PaymentButton';
import openRazorpayCheckout from '@cart/openRazorpayCheckout';

interface PaymentMethodBoxProps {
  totalAmount: number;
}
const PaymentMethodBox: React.FC<PaymentMethodBoxProps>= ({ totalAmount }) => {


   // Payment method state
  const [selectedPayment, setSelectedPayment] = useState("upi"); // default to UPI
  const [selectedUpiApp, setSelectedUpiApp] = useState("");  // no app selected yet
  const [upiId, setUpiId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [upiPrefix, setUpiPrefix] = useState("");
  const [upiSuffix, setUpiSuffix] = useState("");
  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Net banking
  const [selectedBank, setSelectedBank] = useState("");


{/*    const [fullUpiId, setFullUpiId] = useState(""); */}

// Function lives here, outside return
const handleVerify = () => {
  const validHandles = ["ybl","apl","ptyes","ptsbi","pthdfc","ptaxis","amazonpay", "axl", "ibl", "upi", "okhdfc", "okaxis", "okicici", "oksbi"];
    const [prefix, suffix] = upiId.split("@");
    const isValidFormat = /^[a-zA-Z0-9.\-_]{2,}@[a-z]{2,}$/i.test(upiId);

    if (
      isValidFormat &&
      upiId.trim() !== "" &&
      prefix &&
      suffix &&
      validHandles.includes(suffix.toLowerCase())
    ) {
      setIsVerified(true);
      alert(`${upiId} - your UPI ID is successfully verified!`);
    } else {
      setIsVerified(false);
      alert("Please enter a valid UPI ID.");
    }


};
const handlePayment = async () => {
    if (!selectedPayment) {
        alert("Please select a payment method before proceeding");
    }
 if (selectedPayment === "upi")
  {
     if (!upiId || !isVerified) {
      const idToUse =
        selectedUpiApp === "googlepay"
          ? `${upiPrefix}${upiSuffix}`
          : upiId;
      alert(`Proceeding with UPI via ${selectedUpiApp} (${idToUse || "no ID"})`);
      return; // ✅ stop here if invalid
    }

    const amountInPaise = Math.round(totalAmount * 100);
    console.log("UPI ID:", upiId);
    console.log("Total amount (in rupees):", totalAmount);
    console.log("Converted amount (in paise):", amountInPaise);
try {
      const backendResponse = await fetch("http://localhost:8081/api/payments/upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      if (!backendResponse.ok) {
        throw new Error("Failed to create Razorpay UPI order");
      }

      const data = await backendResponse.json();

      const options = {
        key: "rzp_test_Rpsv98lSsdaw71",
        amount: amountInPaise,
        currency: "INR",
        order_id: data.orderId,
        name: "ThoughtProcessing",
        description: "UPI Payment",
        method: { upi: true },
        handler: function (response: any) {
          console.log("UPI success:", response);
          // 👉 Save the Razorpay response before redirect
              /* localStorage.setItem("razorpayResponse", JSON.stringify(response)); */
          // Save all fields, not just payment_id
          localStorage.setItem("razorpayResponse", JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
               razorpay_payment_id: response.razorpay_payment_id,
               razorpay_signature: response.razorpay_signature, }));

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
                const orderId = verifyData.orderId || response.razorpay_order_id || options.order_id;
                const paymentIdParam = verifyData.paymentId ? `&payment_id=${verifyData.paymentId}` : "";
            if (verifyData.status === "captured" || verifyData.status === "success") {
                  window.location.href = `/order-success?order_id=${orderId}${paymentIdParam}&amount=${verifyData.amount}`;
                                           /*  window.location.href = "/order-success?order_id=" + response.razorpay_order_id; */
                                           /*  window.location.href = "/order-success?order_id=" + verifyData.orderId + "&payment_id=" + verifyData.paymentId+ "&amount="+ verifyData.amount; */
            } else if (verifyData.status === "pending"){
                 window.location.href = "/order-processing?order_id=" + verifyData.orderId;
                                          }
                                      else {
                                          // For UPI failures → show Pay Again
                                          if (verifyData.method === "upi") {
                                              window.location.href = `/order-failed?order_id=${orderId}&retry=true`;
                                          }
                                            window.location.href = "/order-failed?order_id=" + verifyData.orderId;
                                          }
          console.log("Verify response:", verifyData);


            });
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("UPI payment error:", err);
      alert("Something went wrong while initiating UPI payment");
    }
}

else if (selectedPayment === "card") {
    alert("Proceeding with Credit/Debit Card payment");

     const amountInPaise = Math.round(totalAmount * 100);
     try{
     const backendResponse = await fetch("http://localhost:8081/api/payments/card", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ amount: amountInPaise }),
     });

     const data = await backendResponse.json();
     /* openRazorpayCheckout(data.id, totalAmount, "card"); */

     const options = { key: "rzp_test_Rpsv98lSsdaw71", amount: amountInPaise,
         currency: "INR",
         order_id: data.orderId,
          name: "ThoughtProcessing",
          description: "Card Payment",
          method: { card: true },
        handler: function (response: any) {
            console.log("Card success:", response);
            localStorage.setItem("razorpayResponse", JSON.stringify({
                          razorpay_order_id: response.razorpay_order_id,
                           razorpay_payment_id: response.razorpay_payment_id,
                           razorpay_signature: response.razorpay_signature, }));

         fetch("http://localhost:8081/api/payments/verify", {
             method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature, }),
              })
          .then((res) => res.json())
          .then((verifyData) => {
              const orderId = verifyData.orderId || response.razorpay_order_id || options.order_id;
               const paymentIdParam = verifyData.paymentId ? `&payment_id=${verifyData.paymentId}` : "";
               if (verifyData.status === "captured" || verifyData.status === "success") {
                   window.location.href = `/order-success?order_id=${orderId}${paymentIdParam}&amount=${verifyData.amount}`;
                                                         /*  window.location.href = "/order-success?order_id=" + response.razorpay_order_id; */
                                                         /*  window.location.href = "/order-success?order_id=" + verifyData.orderId + "&payment_id=" + verifyData.paymentId; */
                                                          } else if (verifyData.status === "pending") {
                                                          window.location.href = "/order-processing?order_id=" + verifyData.orderId;
                                                        } else {
                                                           // Card/NetBanking failures → go back to checkout page
                                                            window.location.href = "http://localhost:8080/checkout?retry=true";
                                                          /* window.location.href = "/order-failed?order_id=" + verifyData.orderId; */
                                                        }
                  });
              },
          theme: { color: "#3399cc" },
          };
      const rzp = new (window as any).Razorpay(options);
      rzp.open(); }
      catch (err) {
          console.error("Card payment error:", err);
          alert("Something went wrong while initiating Card payment"); }


    }
else if (selectedPayment === "cod") {
    alert("Cash on Delivery selected");
try {
    const backendResponse = await fetch("http://localhost:8081/api/payments/cod",
    {
        method: "POST", headers:
        {
            "Content-Type": "application/json"
         },
     body: JSON.stringify({ amount: totalAmount }), });
     if (!backendResponse.ok) { throw new Error("Failed to create COD order");
         }

     const data = await backendResponse.json();
      window.location.href = "/order-success?order_id=" + data.orderId;
      }
       catch (err) {
           console.error("COD order error:", err);
           alert("Something went wrong while creating COD order");
            }
  }

else if (selectedPayment === "netbanking") {
    if (!selectedBank) {
      alert("Please select a bank before proceeding");
      return;
    }
const amountInPaise = Math.round(totalAmount * 100);
  try {
    const backendResponse = await fetch("http://localhost:8081/api/payments/netbanking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank: selectedBank, amount: amountInPaise }),
    });

    if (!backendResponse.ok) {
      throw new Error("Failed to create Razorpay Netbanking order");
    }

    const data = await backendResponse.json();
     const options = {
          key: "rzp_test_Rpsv98lSsdaw71",
          amount: amountInPaise,
          currency: "INR",
          order_id: data.orderId,
          name: "ThoughtProcessing",
          description: "Netbanking Payment ",
          method: { netbanking: true },
          handler: function (response: any) {
            console.log("Netbanking success:", response);
             localStorage.setItem("razorpayResponse", JSON.stringify({
                                      razorpay_order_id: response.razorpay_order_id,
                                       razorpay_payment_id: response.razorpay_payment_id,
                                       razorpay_signature: response.razorpay_signature, }));

            fetch("http://localhost:8081/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                           razorpay_order_id: response.razorpay_order_id,
                           razorpay_payment_id: response.razorpay_payment_id,
                         razorpay_signature: response.razorpay_signature,
                        }),
                      })
                  .then((res) => res.json())
                            .then((verifyData) => {
                              const orderId = verifyData.orderId || response.razorpay_order_id || options.order_id;
                               const paymentIdParam = verifyData.paymentId ? `&payment_id=${verifyData.paymentId}` : "";
                                             if (verifyData.status === "captured" || verifyData.status === "success") {
                                                 window.location.href = `/order-success?order_id=${orderId}${paymentIdParam}&amount=${verifyData.amount}`;
                                                                                       /*  window.location.href = "/order-success?order_id=" + response.razorpay_order_id; */
                                                                                       /*  window.location.href = "/order-success?order_id=" + verifyData.orderId + "&payment_id=" + verifyData.paymentId; */
                                                                                        } else if (verifyData.status === "pending") {
                                                                                        window.location.href = "/order-processing?order_id=" + verifyData.orderId;
                                                                                      } else {// Card/NetBanking failures → go back to checkout page
                                                                                          window.location.href = "http://localhost:8080/checkout?retry=true";
                                                                                      /*   window.location.href = "/order-failed?order_id=" + verifyData.orderId; */
                                                                                      }
                            });
                        },
                        theme: { color: "#3399cc" },
                      };

                      const rzp = new (window as any).Razorpay(options);
                      rzp.open();
                    } catch (err) {
                        console.error("Netbanking payment error:", err);
                            alert("Something went wrong while initiating Netbanking payment");
                          }
}
};
    /* const amountInPaise = Math.round(totalAmount * 100);
    console.log("Selected bank:", selectedBank);
    console.log("Total amount (in rupees):", totalAmount);
    console.log("Converted amount (in paise):", amountInPaise);
    try {
      const data = await startNetBankingPayment(selectedBank, amountInPaise);
      console.log("Sending amount:", amountInPaise);
      console.log(data);
      window.location.href = data.redirectUrl;
     } catch (err) {
      console.error("NetBanking payment error:", err);
      alert("Something went wrong while initiating NetBanking payment");
    } */





const isPaymentValid = () => {
  if (selectedPayment === "upi") {
    return (
      selectedUpiApp &&
      (
          // Case 1: Google Pay
       (selectedUpiApp === "googlepay" && upiSuffix && upiPrefix.trim().length > 0) ||
         // Case 2: Other UPI apps (PhonePe, Amazon Pay, Paytm, etc.)
       (selectedUpiApp !== "googlepay" && isVerified)
      )
    );
  }
  if (selectedPayment === "card") {
    return (
      cardNumber.trim().length >= 16 &&
      cardName.trim().length > 0 &&
      expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
      cvv.trim().length === 3
    );
  }
  if (selectedPayment === "netbanking") {
    return selectedBank !== "";
  }
  if (selectedPayment === "cod") {
    return true; // Cash on Delivery always valid
  }
  return false;
};

useEffect(() => {
  if (selectedPayment !== "upi") {
    setSelectedUpiApp("");
    setUpiId("");
    setIsVerified(false);
    setUpiPrefix("");
    setUpiSuffix("");
  }
}, [selectedPayment]);

/* function PaymentMethodBox() { */
    useEffect(() => {
  const resp = JSON.parse(localStorage.getItem("razorpayResponse") || "{}");
  if (resp.razorpay_order_id) {
    console.log("Order ID:", resp.razorpay_order_id);
    console.log("Payment ID:", resp.razorpay_payment_id);
    console.log("Signature:", resp.razorpay_signature);
  }
}, []);
/* } */


// ✅ return is only for JSX
return (

    <div className="payment-method-box">
    <div className="checkout-columns" style={{ display: "flex", gap: "30px" }}>
   {/* div className="checkout-columns" style={{ display: "flex", gap: "30px" }}*/}
 {/* Left column */}
    <div className="left-column" style={{ flex: 1 }}
>
      <h4>Payment Method</h4>
     <div className="payment-options">
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={selectedPayment === "upi"}
                      onChange={() => setSelectedPayment("upi")}
                    />
                    UPI (Google Pay, PhonePe,Paytm,Amazon)
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={() => setSelectedPayment("card")}
                    />
                    Credit/Debit Card
                    </label>
                                           <label>
                                             <input
                                               type="radio"
                                               name="payment"
                                               value="netbanking"
                                               checked={selectedPayment === "netbanking"}
                                               onChange={() => setSelectedPayment("netbanking")}
                                             />
                                             Net Banking
                                           </label>

                       <label>
                         <input
                           type="radio"
                           name="payment"
                           value="cod"
                           checked={selectedPayment === "cod"}
                           onChange={() => setSelectedPayment("cod")}
                         />
                          Cash on Delivery

                       </label>

                     </div>
                     </div>
          {/* UPI apps list */}
              {/* Right column */}
              <div className="right-column" style={{ flex: 1 }}>


          {selectedPayment === "upi" && (
               <>

        <div className="upi-app-options mt-3" style={{ maxWidth: "500px", width: "100%" }}>


             <h4 style={{ marginBottom: "12px" }}>Select the UPI App</h4>


              <label style={{ display: "block", marginBottom: "8px" }}
>
                <input
                  type="radio"
                  name="upiApp"
                  value="googlepay"
                  checked={selectedUpiApp === "googlepay"}
                  onChange={() => setSelectedUpiApp("googlepay")}
                />
                 <img
                    src={googlepay}
                    alt="Google Pay"
                    style={{ width: "24px", height: "20px" }} // 👈 matches radio size nicely
                  />


                Google Pay
              </label>
              <label style={{ display: "block", marginBottom: "8px" }}
>
                <input
                  type="radio"
                  name="upiApp"
                  value="phonepe"
                  checked={selectedUpiApp === "phonepe"}
                  onChange={() => setSelectedUpiApp("phonepe")}
                />
                 <img
                    src={phonepe}
                    alt="PhonePe"
                    style={{ width: "24px", height: "20px" }} // 👈 matches radio size nicely
                  />


                PhonePe
              </label>
              <label style={{ display: "block", marginBottom: "8px" }}
>
                  <input
                   type="radio"
                   name="upiApp"
                    value="amazon"
                     checked={selectedUpiApp === "amazon"}
                     onChange={() => setSelectedUpiApp("amazon")}
                  /> <img
                        src={amazonpay}
                        alt="Amazon Pay"
                        style={{ width: "20px", height: "20px" }} // 👈 matches radio size nicely
                      />



                  Amazon Pay
                 </label>

              <label style={{ display: "block", marginBottom: "8px" }}
>
                <input
                  type="radio"
                  name="upiApp"
                  value="paytm"
                  checked={selectedUpiApp === "paytm"}
                  onChange={() => setSelectedUpiApp("paytm")}
                />
                 <img
                    src={paytm}
                    alt="Pyatm"
                    style={{ width: "24px", height: "24px" }} // 👈 matches radio size nicely
                  />


                Paytm
              </label>
            </div>
          {/* )} */}

 {/* Conditional UPI ID input for PhonePe */}
         {selectedPayment === "upi" && selectedUpiApp && (
            <div className="upi-id-box mt-3" style={{ maxWidth: "400px", width: "100%" }}>
              <label htmlFor="upiId" style={{ display: "block", marginBottom: "8px" }}>UPI ID:</label>


          {/* Google Pay flow */}
        {selectedUpiApp === "googlepay" ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Enter UPI username"
              value={upiPrefix}
              onChange={(e) => setUpiPrefix(e.target.value)}
              style={{ width: "100%" }}
            />
            <div style={{ marginBottom: "20px" }}>


             <label htmlFor="upiSuffix" style={{ display: "block", marginBottom: "8px" }}>
               Handle
             </label>

            <select

              value={upiSuffix}
              onChange={(e) => setUpiSuffix(e.target.value)}
            >
              <option value="">Select</option>
              <option value="@okhdfc">@okhdfc</option>
              <option value="@okaxis">@okaxis</option>
              <option value="@okicici">@okicici</option>
              <option value="@oksbi">@oksbi</option>
            </select>
           {/*  <p>UPI:{upiPrefix && upiSuffix ? `${upiPrefix}${upiSuffix}` : "—"}</p> */}
          </div>
</div>

    ): (
           /* Other apps flow */
           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
             <input
               type="text"
               id="upiId"
               placeholder="example@upi"
               value={upiId}
               onChange={(e) => {
                 setUpiId(e.target.value);
                 setIsVerified(false);
               }}
               style={{ flex: 1 }}
             />
             <button
               className="btn btn-secondary mt-2"
               onClick={handleVerify}
             >
               VERIFY
             </button>
           </div>
         )}

     <button
                     className="btn btn-success mt-3"
                     disabled={!(
                       (selectedUpiApp === "googlepay" && upiSuffix && upiPrefix.trim().length > 0) ||
                       (selectedUpiApp !== "googlepay" && isVerified)
                     )}
                     onClick={handlePayment}
                   >
                     PAY NOW
                   </button>
       </div>

     )}


 {/* ✅ Conditional success message inside return JSX */}
             {isVerified && (
               <p className="text-success mt-2">
                 ✅ {upiId} is verified successfully!
               </p>
             )}
          </>
)}


  {/* Payment options */}
      {/* UPI apps list */}
      {/* Conditional UPI ID input */}
      {/* Pay Now button */}

{/* Card form */}
 {selectedPayment === "card" && (
     <div className="card-payment-box">
 <h4>Add a New Card</h4>

  {/* Card Number */}

   <div className="form-group mb-3">
    <label htmlFor="cardNumber" style={{ display: "block", marginBottom: "8px" }}>Card Number</label>
   <input
     type="text"
     value={cardNumber}
     onChange={(e) => setCardNumber(e.target.value)}
     placeholder="Enter Card Number"
   />
   {cardNumber.trim().length < 16 && (
     <p className="text-danger">Enter valid card number</p>
   )}


  </div>
{/* Name on Card */}
  <div className="form-group mb-3">
   <label htmlFor="cardNumber" style={{ display: "block", marginBottom: "8px" }}>Name on Card</label>
   <input
     type="text"
     value={cardName}
     onChange={(e) => setCardName(e.target.value)}
     placeholder="Enter Name on card"
   />
   {cardName.trim().length === 0 && (
     <p className="text-danger">Enter the name on the card</p>

)}
  </div>
 {/* Expiry + CVV inline */}
  <div className="form-group mb-3" style={{ display: "flex", gap: "15px" }}>
    <div style={{ flex: 1 }}>
      <label htmlFor="expiry">Expiry (MM/YY)</label>
      <input
        type="text"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        placeholder="MM/YY"
      />
      {!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) && (
        <p className="text-danger">Enter card expiry in MM/YY format</p>

)}
    </div>
    <div style={{ flex: 1 }}>
      <label htmlFor="cvv">
        CVV <span style={{ borderRadius: "50%", border: "1px solid #ccc", padding: "2px 6px" }}>?</span>
      </label>
     <input
       type="password"
       value={cvv}
       onChange={(e) => setCvv(e.target.value)}
       placeholder="CVV"
     />
     {cvv.trim().length !== 3 && (
       <p className="text-danger">Enter a valid CVV number</p>

)}
    </div>
  </div>
 {/* Save card checkbox */}
  <div className="form-group mb-3">
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input type="checkbox" />
      Save this card for future transactions
      <span style={{ borderRadius: "50%", border: "1px solid #ccc", padding: "2px 6px" }}>?</span>
    </label>
  </div>

  {/* Pay Now button */}
 <button
       className="btn btn-success mt-3"
       disabled={!(
         cardNumber.trim().length >= 16 &&
         cardName.trim().length > 0 &&
         expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
         cvv.trim().length === 3
       )}
       onClick={handlePayment}
     >
       PAY NOW
     </button>
  <p className="mt-2">
    By clicking this button, you agree to our <a href="#">Terms and Conditions</a>
  </p>
  </div>
)}

{selectedPayment === "netbanking" && (
  <div className="netbanking-box">
    <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
      <option value="">Select your bank</option>
      <option value="hdfc">HDFC Bank</option>
      <option value="icici">ICICI Bank</option>
      <option value="kotak">Kotak Mahindra Bank</option>
      <option value="axis">Axis Bank</option>
      <option value="sbi">State Bank of India</option>
      <option value="yes">Yes Bank</option>
      <option value="canara">Canara Bank</option>
      <option value="iob">Indian Overseas Bank (IOB)</option>
      <option value="dbs">DBS Bank</option>
      <option value="hsbc">HSBC</option>
      <option value="citi">Citi Bank</option>


      {/* Add more banks */}
    </select>

    <button
      className="btn btn-success mt-3"
      disabled={selectedBank === ""}
      onClick={handlePayment}
    >
      PAY NOW
    </button>
  </div>
)}
{/* COD option */}
     {selectedPayment === "cod" && (
         <div className="cod-option mt-3"
         style={{ maxWidth: "500px", width: "100%" }}>
         <h4 style={{ marginBottom: "12px" }}>
         Select Payment Method</h4>
          <label style={{ display: "block", marginBottom: "8px" }}>
           <input type="radio" name="codOption"
           value="cod"
           checked={selectedPayment === "cod"}
           onChange={() => setSelectedPayment("cod")} />
           <img src={cod}   // 👈 you can add a small COD icon or cash symbol
          alt="Cash on Delivery"
          style={{ width: "24px", height: "20px" }} />
           Cash on Delivery
           </label>
           <button className="btn btn-success mt-3"
           disabled={selectedPayment==null}
           onClick={handlePayment} > PAY NOW </button>
           </div>
           )}



    </div>

    </div>
     <div>



              {/* Your payment method selection UI here */}

              {/* 👇 Pass props down to PaymentButton */}
              <PaymentButton
                total={totalAmount}
                selectedBank={selectedBank}
                selectedPayment={selectedPayment}
              />
            </div>

    </div>


  );
};

export default PaymentMethodBox;
