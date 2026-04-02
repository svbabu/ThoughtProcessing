import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import openRazorpayCheckout from "./openRazorpayCheckout";

import { FaCheckCircle, FaShareAlt } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import payerLogoUrl from '@img/payerLogoUrl.png';
import shopLogoUrl from '@img/shopLogoUrl.png';
import googlepay from '@img/googlepay.png';
import phonepe from '@img/phonepe.png';
import paytm from '@img/paytm.png';
import amazonpay from '@img/amazonpay.png';
import defaultbankicon from '@img/defaultbankicon.png';
import star from '@img/star.png';
// Card network icons
import visaIcon from '@img/visaIcon.png';
import mastercardIcon from '@img/mastercardIcon.png';
import rupayIcon from '@img/rupayIcon.png';
// Issuer bank icons
import hdfcIcon from '@img/hdfcIcon.png';
import axisIcon from '@img/axisIcon.png';
import iciciIcon from '@img/iciciIcon.png';
import sbiIcon from '@img/sbiIcon.png';
import yesbankIcon from '@img/yesbankIcon.png';

interface AcquirerData {
    rrn: string;
    transactionId: string;
    authCode?: string;
    }

 interface OrderSuccessDTO {
  id: number;
  bank: string;
  amount: number;
  status: string;
  orderId: string;
  paymentId: string;
  method: "upi" | "card" | "netbanking";
  upiId: string;
  personName:string;
  companyName:string;
  contact: string;
  email: string;
 /*  timestamp:string; */
  transactionId:string;
  rrn:string;
  acquirer_data?: AcquirerData; // 👈 add nested type
  merchantName:string;
  merchantUpiId:string;
  merchantBank:string;
  createdAt:string;

  // 👇 Card‑related fields
  cardDetails?: string; // Masked number (XXXX‑XXXX‑XXXX‑0153)
  cardNetwork?: string; // Visa / Mastercard / RuPay
  cardType?: string; // Credit / Debit
  cardSubType?: string; // Consumer / Corporate
  issuer?: string; // Bank code (UTIB, HDFC, etc.)
  authCode?: string; // Authorization code from acquirer_data
  emiEligible?: boolean; // Whether EMI is supported
  international?: boolean; // Whether card supports international transactions
  emiStatus?: string; // Optional: EMI plan status (if Razorpay sends)


}
const OrderSuccess: React.FC = () => {
     // State for backend DTO
     const [orderData, setOrderData] = useState<OrderSuccessDTO | null>(null);
     const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);

     const location = useLocation(); const queryParams = new URLSearchParams(location.search); // Extract query params
     const orderId = queryParams.get("order_id");
     const paymentId = queryParams.get("payment_id");
     const amount = Number(queryParams.get("amount")) || 0;
     const shopName = queryParams.get("shopName") || "Shop Name";
     const bankName = queryParams.get("bank") || "";
      const vpa = orderData?.upiId || queryParams.get("upiId") || "";
      type PaymentMethod = "upi" | "card" | "netbanking" | "";
      const method = (queryParams.get("method") as PaymentMethod) || "";
    /*  const date = orderData?.createdAt ? new Date(orderData.createdAt).toLocaleString() : new Date().toLocaleString(); */
    const date = orderData?.createdAt ? new Intl.DateTimeFormat("en-IN",
        { dateStyle: "short", timeStyle: "medium" }).format(new Date(orderData.createdAt)) :
        new Date().toLocaleString();
     const contact=queryParams.get("contact");
     const email=queryParams.get("email");
     const transactionId=orderData?.acquirer_data?.transactionId
     const rrn=orderData?.acquirer_data?.rrn;
      /* const merchantName=orderData?.merchantName;  */
     /*  const merchantName=queryParams.get("merchantName");  */
  /*    const merchantUpiId=orderData?.merchantUpiId; */
      /* const  merchantUpiId=queryParams.get("merchantUpiId"); */
     /* const merchantBank=orderData?.merchantBank; */
     /* const merchantBank=queryParams.get("merchantBank"); */
     const getValue = (field: keyof OrderSuccessDTO, paramKey: string, fallback = "") =>
      orderData?.[field] || queryParams.get(paramKey) || fallback;
      const merchantName = getValue("merchantName", "merchantName", "Shop Name");
      const merchantBank = getValue("merchantBank", "merchantBank") ;
      const merchantUpiId = getValue("merchantUpiId", "merchantUpiId");
     const [showDetails, setShowDetails] = useState(false);

     /* cardDetails */
     const cardDetails = orderData?.cardDetails || queryParams.get("cardDetails") || "";
     const cardNetwork = orderData?.cardNetwork || queryParams.get("cardNetwork") || "";
     const cardType = orderData?.cardType || queryParams.get("cardType") || "";
     const cardSubType = orderData?.cardSubType || queryParams.get("cardSubType") || "";
     const issuer = orderData?.issuer || queryParams.get("issuer") || "";
     const authCode = orderData?.authCode || queryParams.get("authCode") || "";
     const emiEligible = orderData?.emiEligible ?? (queryParams.get("emiEligible") === "true");
     const international = orderData?.international ?? (queryParams.get("international") === "true");
     const emiStatus = orderData?.emiStatus || queryParams.get("emiStatus") || "";
// State for card icon
const [selectedCardIcon, setSelectedCardIcon] = useState<string | null>(null);
const [selectedBankIcon, setSelectedBankIcon] = useState<string | null>(null);
const [selectedCardnwIcon, setSelectedCardnwIcon] = useState<string | null>(null);
//netbanking
{/* const [selectedBankIcons, setSelectedBankIcon] = useState<string | null>(null); */}

// Fetch backend DTO
useEffect(() => { if (orderId) { fetch(`http://localhost:8081/api/payments/ordersuccess/${orderId}`)
.then(res => { if (!res.ok) throw new Error("Failed to fetch order success details");
    return res.json(); }) .then(data => { setOrderData(data);
        console.log("Merged Order Success Data:", data); }) .
        catch(err => console.error(err)); } }, [orderId]);



         const upiAppIcons: Record<string, string> = {
             googlepay:googlepay,
             phonepe:phonepe,
             paytm:paytm,
             amazonpay:amazonpay,
    };

 const cardNetworkIcons: Record<string, string> = {
  visa: visaIcon,
  mastercard: mastercardIcon,
  rupay: rupayIcon,
};

const issuerBankIcons: Record<string, string> = {
  HDFC: hdfcIcon,
  UTIB: axisIcon,   // Axis Bank (UTIB code)
  ICIC: iciciIcon,
  SBIN: sbiIcon,
  YESB:yesbankIcon,
  yesbankIcon:yesbankIcon
};
const cardIcons: Record<string, string> = {
    visa: visaIcon,
    mastercard: mastercardIcon,
    rupay: rupayIcon,
    hdfc: hdfcIcon,
    axis: axisIcon,
    sbi: sbiIcon,
    icici:iciciIcon,
    YESB:yesbankIcon,
    yesbankIcon:yesbankIcon,
    UTIB: axisIcon,
    "AXIS BANK":axisIcon,
     axisIcon:axisIcon

    };
const bankIcons: Record<string, string> = {
    HDFC: hdfcIcon,
    hdfc:hdfcIcon,
    UTIB: axisIcon,
    SBIN: sbiIcon,
    ICIC: iciciIcon,
    "AXIS BANK":axisIcon,
     axis:axisIcon,
    YESB:yesbankIcon,   // add more banks as needed
    yesb:yesbankIcon
    };
   const bankMap: Record<string, string> = {
    "UTIB": "axis",
     "AXIS BANK": "axis",
     "HDFC": "hdfc",
     "SBIN": "sbi",
     "ICICI": "icici",
     "YESB":"yesb",
     "YES BANK":"yesb",
      "MASTERCARD":"mastercard",
     "VISA":"visa",
     "PHONEPE":"phonepe",
     "GOOGLEPAY":"googlepay",
     "AMAZONPAY":"amazonpay",
     "PAYTM":"paytm"
      };


useEffect(() => {
    const merchantBank = orderData?.merchantBank?.toUpperCase(); //owner
    const issuer = orderData?.issuer?.toUpperCase();  //card
    const bank=orderData?.bank?.toUpperCase();  //netbanking
    const network=orderData?.cardNetwork?.toUpperCase();
    const upiId=orderData?.upiId?.toUpperCase();


    if (issuer && bankMap[issuer]) setSelectedCardIcon(bankMap[issuer]);
    if (bank && bankMap[bank]) setSelectedBankIcon(bankMap[bank]);
    if (merchantBank && bankMap[merchantBank]) setSelectedBankIcon(bankMap[merchantBank]);
      if (network && bankMap[network]) setSelectedCardnwIcon(bankMap[network]);
      if(upiId && bankMap[upiId])setSelectedUpiApp(bankMap[upiId]);



    console.log("Bank detection ran with merchantBank for send paymrent & Issuer for card & bank for netbanking:",  merchantBank,issuer,bank);
  }, [orderData]);
// For UPI, derive bank from suffix
 //const validHandles = ["ybl","apl","ptyes","ptsbi","pthdfc","ptaxis","amazonpay",
     //"axl", "ibl", "upi", "okhdfc", "okaxis", "okicici", "oksbi"]; callling upi handlers from PaymentMethodBox tsx file
    // & if we need to add new handlers we can add them there
 const resolveBankFromVpa = (vpa: string) => {
   const vpaLower = vpa.toLowerCase();
   if (vpaLower.includes("ybl")) return "YESB";
   if (vpaLower.includes("apl")) return "AXIS";
   if (vpaLower.includes("okaxis")) return "AXIS";
   if (vpaLower.includes("okhdfcbank")) return "HDFC";
   if (vpaLower.includes("okicici")) return "ICICI";
   if (vpaLower.includes("amazonpay")) return "AXIS";
   if (vpaLower.includes("oksbi")) return "SBI";
   if (vpaLower.includes("ptyes")) return "YESB";
      if (vpaLower.includes("ptye")) return "YESB";
   if (vpaLower.includes("ptaxis")) return "AXIS";
   if (vpaLower.includes("ptsbi")) return "SBI";
   if (vpaLower.includes("pthdfc")) return "HDFC";
   if (vpaLower.includes("axl")) return "AXIS";

   return null;
 };

// Example resolver for merchant app
const resolveMerchantAppFromVpa = (vpa: string) => {
  const vpaLower = vpa.toLowerCase();
  if (vpaLower.includes("ybl")) return "phonepe";
  if (vpaLower.includes("paytm") || vpaLower.includes("ptyes")) return "paytm";

  if (vpaLower.includes("amazonpay") || vpaLower.includes("apl")) return "amazonpay";
  if (vpaLower.includes("okaxis") || vpaLower.includes("okhdfcbank")) return "googlepay";
  return null;
};


    //merchantBank
     const merchantBankNormalized = orderData?.merchantBank?.toUpperCase()|| resolveBankFromVpa(orderData?.upiId || "");
     const merchantIconKey = merchantBankNormalized && bankMap[merchantBankNormalized];

     // Merchant App (QR branding)
     const merchantAppIconKey = resolveMerchantAppFromVpa(orderData?.merchantUpiId || "");




     //debit/credit card payment  with bank Icons with issuer dependency and came  from db
     const cardIconsNormalized=orderData?.issuer?.toUpperCase();
     const cardIconKey=cardIconsNormalized&&bankMap[cardIconsNormalized];

     //netbanking  payment with bank icons  depends oon bank field from db
     const bankIconsNormalized=orderData?.bank?.toUpperCase()|| resolveBankFromVpa(orderData?.upiId || "");
     const bankIconKey=bankIconsNormalized&&bankMap[bankIconsNormalized];

     //card network icon for card

     const cardnwIconNoramalized=orderData?.cardNetwork?.toUpperCase();
     const cardnwIconKey=cardnwIconNoramalized&&bankMap[cardnwIconNoramalized];

     const   appUpiIconNoramalized=orderData?.upiId?.toUpperCase() || orderData?.bank?.toUpperCase();
     const   appUpiIconsKey=appUpiIconNoramalized&&bankMap[appUpiIconNoramalized]



// Detect UPI app icon
useEffect(() => { if (vpa) {
    const vpaLower = vpa.toLowerCase();
    if (vpaLower.includes("paytm"))
    setSelectedUpiApp("paytm");
     else if (vpaLower.includes("ptye") )
         setSelectedUpiApp("paytm");  // ✅ map ptyes to paytm
    else if (vpaLower.includes("phonepe"))
    setSelectedUpiApp("phonepe");
    else if (vpaLower.includes("amazonpay"))
     setSelectedUpiApp("amazonpay");
      else if (vpaLower.includes("apl") )
              setSelectedUpiApp("amazonpay");  // ✅ map apl to amazonpay

     else if (vpaLower.includes("okaxis") || vpaLower.includes("okhdfcbank"))
     setSelectedUpiApp("googlepay");
     else if (vpaLower.includes("ybl"))
     setSelectedUpiApp("phonepe"); // ✅ map ybl to PhonePe

       /* // Detect Bank
         if (vpaLower.includes("ybl")) {
           setBankIconKey("YESB"); // Yes Bank
         } else if (vpaLower.includes("okaxis")) {
           setBankIconKey("AXIS"); // Axis Bank
         } else if (vpaLower.includes("okhdfcbank")) {
           setBankIconKey("HDFC"); // HDFC Bank
         } else if (vpaLower.includes("ibl")) {
           setBankIconKey("ICICI"); // ICICI Bank
         } */


     console.log("vpa",vpa)
      console.log("vpa",selectedUpiApp)
      console.log("Detection ran, vpa:", vpaLower);
     } }, [vpa]);




useEffect(() => {
    console.log("VPA:", vpa);
    console.log("Selected UPI App:", selectedUpiApp); },
    [vpa, selectedUpiApp]);

useEffect(() => {
    if (selectedUpiApp) {
        console.log("Selected UPI App updated:", selectedUpiApp);
        console.log("icon path:", upiAppIcons[selectedUpiApp]);
        console.log("icon path:", upiAppIcons[selectedUpiApp]);
        } },
        [selectedUpiApp]);

     //card effects

 // Detect card icon based on DTO fields
 useEffect(() => {
     if (cardNetwork) setSelectedCardIcon(cardNetwork.toLowerCase()); },
     [cardNetwork]);
    useEffect(() => {
        const network = orderData?.cardNetwork?.toLowerCase() || cardNetwork?.toLowerCase();
        const issuer = orderData?.issuer?.toUpperCase();
        const merchantBank = orderData?.merchantBank?.toUpperCase(); // from DB payload

        if (network?.includes("visa")) setSelectedCardIcon("visa");
        else if (network?.includes("mastercard")) setSelectedCardIcon("mastercard");
        else if (network?.includes("rupay")) setSelectedCardIcon("rupay");

        if (issuer === "UTIB") setSelectedCardIcon("axisIcon");
        else if (issuer === "HDFC") setSelectedCardIcon("hdfc");
        else if (issuer === "SBIN") setSelectedCardIcon("sbi");
         else if (issuer === "ICICI") setSelectedCardIcon("icici");
           else if (issuer === "YESB") setSelectedCardIcon("yesb");
           else if (issuer === "yesbankIcon") setSelectedCardIcon("yesbankIcon");

           //bankIcons for issuer

        if (issuer === "UTIB") setSelectedBankIcon("axis");
        else if (issuer === "HDFC") setSelectedBankIcon("hdfc");
        else if (issuer === "SBIN") setSelectedBankIcon("sbi");
         else if (issuer === "ICICI") setSelectedBankIcon("icici");
           else if (issuer === "YESB") setSelectedBankIcon("yesb");

         // Merchant bank for selcted cardIcons detection for card (new branch)
         if (merchantBank === "AXIS BANK") setSelectedCardIcon("AXIS");
         else if (merchantBank === "HDFC") setSelectedCardIcon("hdfc");
         else if (merchantBank === "SBIN") setSelectedCardIcon("sbi");
         else if (merchantBank === "ICICI") setSelectedCardIcon("icici");

         //merchantBank for setSelectedBankIcon
         if (merchantBank === "UTIB") setSelectedBankIcon("UTIB");
                  else if (merchantBank === "HDFC") setSelectedBankIcon("hdfc");
                  else if (merchantBank === "SBIN") setSelectedBankIcon("sbi");
                  else if (merchantBank === "ICICI") setSelectedBankIcon("icici");
        console.log("Card detection ran:", network, issuer,merchantBank); },
        [orderData, cardNetwork]);

        useEffect(() => { if (orderData?.method === "netbanking" && orderData?.bank)
            { setSelectedBankIcon(orderData.bank.toUpperCase()); } },
             [orderData?.method, orderData?.bank]);
     // Debug logs
     useEffect(() => {
       console.log("Selected Card Icon:", selectedCardIcon);
       if (selectedCardIcon) {
         console.log("Icon path found:", cardIcons[selectedCardIcon]);



         console.log("Network icon path:", cardNetworkIcons[orderData?.cardNetwork?.toLowerCase() || ""]);
         console.log("Issuer icon path:", issuerBankIcons[orderData?.issuer?.toUpperCase() || ""]);
         console.log("Icon path not found:", selectedCardIcon ? cardIcons[selectedCardIcon] : "No icon found");
       }
     }, [selectedCardIcon]);

/* const handlePayAgain = async () => {
  if (!orderData) return;

  try {
    // Step 1: Create new order with same merchant + amount
    const newOrder = await createOrder({
      amount: orderData.amount,
      merchantId: orderData.merchantName,
    });

    // Step 2: Open Razorpay checkout with new orderId
    openRazorpayCheckout(newOrder.id);

  } catch (err) {
    console.error("Pay Again failed:", err);
  }
}; */

const handlePayAgain = async () => {
    if (!orderData) return;
   const amountInPaise = Math.round(orderData.amount * 100);
   try {
       const res = await fetch("http://localhost:8081/api/payments/upi",
       { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise, upiId: orderData.upiId }), });
        const newOrder = await res.json();
         openRazorpayCheckout(newOrder.orderId, orderData.amount,"upi");
         }
         catch (err) { console.error("Retry failed:", err);
             }
        };





  return (
      <div>

   <div className="order-success-card" style={{ maxWidth: "600px",
       margin: "0 auto", background: "#fff", borderRadius: "12px",
       padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
       <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
       Thank You 🎉</h2>
        {/* Row 1: Success message + amount */}
       <div style={{ background: "#e6ffed", padding: "12px", borderRadius: "8px", display: "flex",
           alignItems: "center", justifyContent: "space-between" }}
            >
        <span> Paid ₹{orderData?.amount || amount} to <strong>{orderData?.merchantName || shopName}
        </strong> <FaCheckCircle color="green" /> </span> </div>

      {/* Method-specific details */}
      {/* {orderData?.method === "upi" && <UpiReceipt orderData={orderData} />} */}
      {/* {orderData?.method === "card" && <CardReceipt orderData={orderData} />} */}
      {/* {orderData?.method === "netbanking" && <NetbankingReceipt orderData={orderData} />} */}

      {/* Row 2: Shop logo + name + UPI ID */}
     <div style={{ display: "flex",
         alignItems: "center",
         marginTop: "12px" }}
     >
        <img src={star}   // 👈 dynamic logo
             alt="Logo" style={{ borderRadius: "50%", width: "40px", height: "40px", marginRight: "10px" }}
             />
      <div>
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
      {orderData?.merchantName || shopName}
      </div>
      <div style={{ fontSize: "14px", color: "#555" }}>
             {orderData?.method === "upi" && (orderData?.merchantUpiId || "")}
            {orderData?.method === "card" && (orderData?.merchantBank || "")}
            {orderData?.method === "netbanking" && (orderData?.merchantBank || "")}
      {/* {orderData?.merchantUpiId}</div> */}
      </div>
    </div>
    </div>
     {/* Row 3: Bank info + payer UPI */}
             {(orderData?.method === "upi" || method === "upi") && (
                 <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                     <span>
                      Banking name: <FaCheckCircle color="green" />{" "}
                      {orderData?.merchantUpiId|| orderData?.merchantName}{" "}
                        </span>
                       {merchantIconKey && bankIcons[merchantIconKey] && (
                              <img src={bankIcons[merchantIconKey]} alt={`${merchantBank} icon`}
                              style={{ width: "32px", height: "20px", marginLeft: "15px" }} /> )}

                         {merchantAppIconKey && upiAppIcons[merchantAppIconKey] && (
                                                      <img src={upiAppIcons[merchantAppIconKey]} alt={`${merchantBank} icon`}
                                                      style={{ width: "20px", height: "15px", marginLeft: "15px" }} /> )}

                    </div>
                  )}
              {orderData?.method === "card" && (
                 <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                 <span>
                  Banking name: <FaCheckCircle color="green" />{" "}
                  {orderData?.merchantName || orderData?.merchantBank}{" "}
                  </span>
                   {merchantIconKey && bankIcons[merchantIconKey] && (
                      <img src={bankIcons[merchantIconKey]} alt={`${merchantBank} icon`}
                      style={{ width: "35px", height: "25px", marginLeft: "15px" }} /> )}
                      </div>
                      )}

 {orderData?.method === "netbanking" && (
    <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
    <span>
   Banking name: <FaCheckCircle color="green" />{" "}
    <strong>{orderData?.merchantName || orderData?.merchantBank}</strong>{" "}</span>
    {merchantIconKey && bankIcons[merchantIconKey] && (
        <img src={bankIcons[merchantIconKey]} alt={`${merchantBank} icon`}
        style={{ width: "25px", height: "25px", marginLeft: "15px" }} /> )}
        </div>
        )}

              {/* Row 3: Bank info + payer UPI */}
             {/*  <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}> */}


            {(orderData?.method === "netbanking" || method === "netbanking") && (
             <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
             <span> Paid from

             <strong>  {bankIconKey && bankIcons[bankIconKey] && (
                                                               <img src={bankIcons[bankIconKey]} alt={`${selectedBankIcon}
                                                                icon`} style={{ width: "35px", height: "20px", marginLeft: "8px" }} /> )}{" "}
             {orderData?.bank || bankName}


             </strong>
              </span>
              </div>)}
               {(orderData?.method === "card" || method === "card") && (
                           <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                           <span> Paid from <strong>{cardIconKey && cardIcons[cardIconKey] && (
                               <img src={cardIcons[cardIconKey]} alt={`${cardIconKey} icon`}
                               style={{ width: "35px", height: "35px", marginLeft: "15px" }} /> )}{" "}

                           {cardnwIconKey && cardNetworkIcons[cardnwIconKey] && (
                               <img src={cardNetworkIcons[cardnwIconKey]} alt={`${cardnwIconKey} icon`}
                               style={{ width: "30px", height: "20px", marginLeft: "12px" }} /> )}


                           </strong>
                            </span>
                            </div>)}

              {(orderData?.method === "upi" || method === "upi") && (
                                <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                  <span>  Paid from
                                   Banking name <FaCheckCircle color="green" />{" "}
                                    {orderData?.upiId || vpa}{" "}</span>

                                     {selectedUpiApp && upiAppIcons[selectedUpiApp] && (

                                         <img  src={upiAppIcons[selectedUpiApp]}   // ✅ no quotes
                                               alt={`${selectedUpiApp} icon`}
                                               style={{ width: "20px", height: "15px", marginLeft: "8px" }} />


                                    )}
                                {/* Bank Icon */}
                                    {bankIconKey && bankIcons[bankIconKey] && (
                                      <img
                                        src={bankIcons[bankIconKey]}
                                        alt={`${bankIconKey} icon`}
                                        style={{ width: "35px", height: "20px", marginLeft: "8px" }}
                                      />
                                    )}


                                  </div>
                                )}


                            {/* Card payer details */} {orderData?.method === "card" && (
                                 <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <span>Payment method: <FaCheckCircle color="green" />{" "}
                                 {orderData?.cardDetails}
                                  {cardnwIconKey && cardNetworkIcons[cardnwIconKey] && (
                                                                                <img src={cardNetworkIcons[cardnwIconKey]} alt={`${cardnwIconKey} icon`}
                                                                                style={{ width: "30px", height: "25px", marginLeft: "15px" }} /> )}
                               { /*  {orderData?.cardNetwork} */}

                                 </span>
                                 {cardIconKey && cardIcons[cardIconKey] && (
                                     <img src={cardIcons[cardIconKey]} alt={`${cardIconKey} icon`}
                                     style={{ width: "35px", height: "35px", marginLeft: "15px" }} /> )}
                                     </div>
                                     )}

                                 {/* Netbanking payer details */}
                                  {orderData?.method === "netbanking" && (
                                      <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                     <span>Netbanking A/C: <FaCheckCircle color="green" />{" "}
                                     <strong>{orderData?.bank}</strong>{" "}</span>
                                     {bankIconKey && bankIcons[bankIconKey] && (
                                         <img src={bankIcons[bankIconKey]} alt={`${selectedBankIcon}
                                          icon`} style={{ width: "35px", height: "20px", marginLeft: "8px" }} /> )}
                                           </div>
                                           )}


{/* Contact info (common) */}

              <p style={{ fontSize: "14px", color: "#555" }}>{orderData?.contact || vpa}</p>
            {/*   </div> */}
          {/* Common merchant bank line */}
                {(orderData?.merchantBank || bankName) && (
                  <p>
                    Sending to
                     {merchantIconKey && bankIcons[merchantIconKey] && (
                            <img src={bankIcons[merchantIconKey]} alt={`${merchantBank} icon`}
                            style={{ width: "25px", height: "25px", marginLeft: "15px" }} /> )}{" "}
                    {orderData?.merchantBank || bankName}

                  </p>
                )}
            {orderData?.method === "upi" && (
                <p>UPI ID: {orderData?.upiId}</p> )}
                {orderData?.method === "card" && (
                    <p>Card type: {orderData?.cardDetails}
                  {/*  {orderData?.cardNetwork}{" "} */}
          {cardnwIconKey && cardNetworkIcons[cardnwIconKey] && (
                                               <img src={cardNetworkIcons[cardnwIconKey]} alt={`${cardnwIconKey} icon`}
                                               style={{ width: "30px", height: "25px", marginLeft: "15px" }} /> )}
                    </p> )}
                    {orderData?.method === "netbanking" && (
                        <p>Netbanking Account: {orderData?.bank}
                        </p>
                        )}

 {/* Row 5: Success message */}
      <div
        style={{
          background: "green",
          padding: "12px",
          borderRadius: "8px",
          marginTop: "12px",
          color: "white", // 👈 sets text color
          textAlign: "center", // 👈 optional: aligns text horizontally

        }}
      >

      <p>
                 Payment of ₹{orderData?.amount || amount} to <strong>{orderData?.merchantName || shopName}</strong> is successful{" "}
                 <FaCheckCircle color=" white" />
               </p>


{/* Row 6: Date/time */}
     <p> {orderData?.createdAt? new Date(orderData.createdAt).toLocaleString() :
         "Date not available"} </p>

        <p style={{ marginTop: "12px", fontStyle: "italic" }}>
              {contact || transactionId|| email|| rrn}
            </p>


<div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            fontWeight: "bold",
            background: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
      onClick={() => setShowDetails(!showDetails)} // 👈 toggle details
        >
         {showDetails ? "Hide Details" : "View Details"}
        </button>
{orderData && orderData.method === "upi" && orderData.status !== "success" && (
<button
onClick={handlePayAgain} // 👈 attach the retry action
          style={{
            fontWeight: "bold",
            background: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Pay Again <FaShareAlt style={{ marginLeft: "6px" }} />
        </button>)}
 <button
           style={{
             fontWeight: "bold",
             background: "white",
             border: "none",
             padding: "10px 20px",
             borderRadius: "8px",
           }}
         >
           Close
         </button>


</div>




 </div> {/* success message div */}

{/* Row 7: Action buttons */}
{showDetails && (
  <div style={{ marginTop:"12px", marginLeft:"20px", marginRight:"20px" }}>
    <p>Transaction details</p>

   {/* Show transactionId + rrn only for UPI and Card */}
       {(orderData?.method === "upi" || orderData?.method === "netbanking") && (
         <>
           {orderData?.transactionId && (
             <div className="summary-row"   style={{
                                                      fontWeight: "normal",
                                                      background: "#f0f0f0",
                                                      border: "none",
                                                      padding: "10px 20px",
                                                      borderRadius: "8px",

                                                    }}>
               <span>Transaction ID: <strong>{orderData.transactionId}</strong></span>
             </div>
           )}
            {orderData?.rrn && (
             <div className="summary-row"  style={{
                                                   fontWeight: "normal",
                                                   background: "#f0f0f0",
                                                   border: "none",
                                                   padding: "10px 20px",
                                                   borderRadius: "8px",

                                                   }}>
               <span>Bank Reference ID: <strong>{orderData.rrn}</strong></span>
             </div>
           )}
         </>
       )}


    <div className="summary-row"   style={{
                                             fontWeight: "normal",
                                             background: "#f0f0f0",
                                             border: "none",
                                             padding: "10px 20px",
                                             borderRadius: "8px",
                                           }}>
      <span>Order ID: {orderData?.orderId}</span>
    </div>
    <div className="summary-row"   style={{
                                             fontWeight: "normal",
                                             background: "#f0f0f0",
                                             border: "none",
                                             padding: "10px 20px",
                                             borderRadius: "8px",
                                           }}>
      <span>Payment ID: {orderData?.paymentId}</span>
    </div>
    <div className="summary-row"   style={{
                                             fontWeight: "normal",
                                             background: "#f0f0f0",
                                             border: "none",
                                             padding: "10px 20px",
                                             borderRadius: "8px",
                                           }}>
      <span>Method: {orderData?.method}</span>
    </div>
    <div className="summary-row"   style={{
                                             fontWeight: "normal",
                                             background: "#f0f0f0",
                                             border: "none",
                                             padding: "10px 20px",
                                             borderRadius: "8px",
                                           }}>
      <span>Contact: {orderData?.contact}</span>
    </div>
     <div className="summary-row"   style={{
                                              fontWeight: "normal",
                                              background: "#f0f0f0",
                                              border: "none",
                                              padding: "10px 20px",
                                              borderRadius: "8px",
                                            }}>
          <span>Email: {orderData?.email}</span>
        </div>

    {/* Optional: method-specific extras */}
    {orderData?.method === "card" && (
      <div className="summary-row"   style={{
                                               fontWeight: "normal",
                                               background: "#f0f0f0",
                                               border: "none",
                                               padding: "10px 20px",
                                               borderRadius: "8px",
                                             }}>
        <span>Card: {orderData?.cardDetails} ({orderData?.cardNetwork})</span>
      </div>
    )}
    {orderData?.method === "upi" && (
      <div className="summary-row"   style={{
                                               fontWeight: "normal",
                                               background: "#f0f0f0",
                                               border: "none",
                                               padding: "10px 20px",
                                               borderRadius: "8px",
                                             }}>
        <span>UPI ID: {orderData?.upiId}</span>
      </div>
    )}
    {orderData?.method === "netbanking" && (
      <div className="summary-row"   style={{
                                               fontWeight: "normal",
                                               background: "#f0f0f0",
                                               border: "none",
                                               padding: "10px 20px",
                                               borderRadius: "8px",
                                             }}>
        <span>Bank: {orderData?.bank}</span>
      </div>
    )}
  </div>
)}
    { /*   <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            fontWeight: "bold",
            background: "#f0f0f0",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
      onClick={() => setShowDetails(!showDetails)} // 👈 toggle details
        >
         {showDetails ? "Hide Details" : "View Details"}
        </button>

 <button
          style={{
            fontWeight: "bold",
            background: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Pay Again <FaShareAlt style={{ marginLeft: "6px" }} />
        </button>

 <button
          style={{
            fontWeight: "bold",
            background: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Close
        </button>

    </div> */}
   </div>
     </div>

      );
      }
         export default OrderSuccess;


