//checkout updated 05/2/25

import React, { useEffect, useRef, useState } from 'react';
import { useCheckout } from '@cart/useCheckout';
import { useOtpAuth } from '@cart/useOtpAuth';
import { AuthModal } from '@cart/AuthModal';
import {ShippingAddress} from '@cart/ShippingAddress';
import { db } from '../../firebase';
import { doc, setDoc,collection, query, where, getDocs } from 'firebase/firestore';
import { AddressFormType } from '../../typed/AddressFormType';
import {DefaultAddressCard} from '@cart/DefaultAddressCard'; // adjust path as needed
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, UserCredential } from 'firebase/auth';
import { auth } from '../../firebase'; // ✅ already initialized
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CartPage from "@cart/CartPage";
import { useCart } from '../cart/CartContext';
import {CartItem } from '@cart/CartItem'; // adjust the path as needed
import { format } from "date-fns";
import latop from "@img/latop.png";
import {CartSummary} from '@cart/CartSummary';
import PaymentMethodBox from '@cart/PaymentMethodBox';
import { useAuth } from "@cart/AuthProvider";

function useCartContext() {

}

 const Checkout: React.FC = () => {
     /* const { isUserLoggedIn } = useAuth(); */
     /* if not working new line without is isUserLoggedIn so enable old code */
    const { showAuthModal, setShowAuthModal, isUserLoggedIn } = useCheckout();
   /* const { showAuthModal, setShowAuthModal} = useCheckout(); */
    /* const [selectedShippingType, setSelectedShippingType] = useState<'home' | 'pickup' | null>(null); */
    const [selectedShippingType, setSelectedShippingType] = useState<'home' | 'pickup'>('home');
    const [defaultAddress, setDefaultAddress] = useState<any>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [deliveryDates, setDeliveryDates] = useState<string[]>(["21/11/2025", "22/11/2025"]);
   /*  const [eligibleProducts, setEligibleProducts] = useState<Product[]>([]); */
  const [selectedPayment, setSelectedPayment] = useState("");
   const [selectedUpiApp, setSelectedUpiApp] = useState("");
   const [upiId, setUpiId] = useState("");
   const [isVerified, setIsVerified] = useState(false);
   const [totalPrice, setTotalPrice] = useState(0);
const [showEligible, setShowEligible] = useState(false);
const [showorderEligible, setShoworderEligible] = useState(false);
const [showPaymentMethod, setShowPaymentMethod] = useState(false);
const [showPaymentSection, setShowPaymentSection] = useState(false);
const [showEditAddress, setShowEditAddress] = useState(false);
const { cart, dispatch} = useCart();
const [form, setForm] = useState<AddressFormType>({
        userId: '',
        fullName: '',
        mobileNumber: '',
        pincode: '',
        city: '',
        state: '',
        buildingName: '',
        streetName: '',
        landmark: '',
        addressType: '',
        useDefault: false,
    });
    const {
        mobile, setMobile,
        otp, setOtp,
        isOtpSent,
        isOtpVerified,
        cooldownTime,
        sendOtp,
        verifyOtp,
        changeNumber
    } = useOtpAuth();
const [isEditing, setIsEditing] = useState(false);
const [showForm, setShowForm] = useState(false);
/* const [isOtpVerified, setIsOtpVerified] = useState( localStorage.getItem("isOtpVerified") === "true" ); */
/* const location = useLocation();
const isOtpVerified = location.state?.isOtpVerified || false; */
    const fetchDefaultAddress = async () => {
        /*const id = 1; // temporary hardcoded ID for testing*/

        const userId = getAuth().currentUser?.uid;
        if (!userId)
          return;
             try {
            // ✅ Try Firestore first
            const q = query(
                collection(db, 'addresses'),
                where('userId', '==', userId),
                where('isDefault', '==', true)
            );
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                console.log("Default address from Firestore:", snapshot.docs[0].data());
                setDefaultAddress(snapshot.docs[0].data());
                return;
            }
            // 🔁 Fallback to backend
            const res = await axios.get(`http://localhost:8081/api/shipping/default/${userId}`);
            if (res.data) {
                setDefaultAddress(res.data);
                toast.success('Default address loaded successfully');
            }
        } catch (error) {
            console.error('Error fetching default address:', error);
            toast.error('Failed to load default address');


        }
    };
const updateDefaultAddress = async (addressData: any) => {
  try {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      toast.error("No user logged in");
      return;
    }

    //await setDoc(doc(db, "addresses", uid), {
        await setDoc(doc(db, "addresses", addressData.id), {
      ...addressData,
      userId: uid,
      isDefault: true
    }, { merge: true });

    setDefaultAddress(addressData);
    toast.success("Default address updated successfully!");
  } catch (error) {
    console.error("Error updating default address:", error);
    toast.error("Failed to update default address");
  }
};



    useEffect(() => {
       /* const id = 1; // temporary hardcoded ID for testing*/
        if (isOtpVerified) {
            fetchDefaultAddress();
             toast.success('is otp verified  to load default address');
        }
    }, [isOtpVerified]);
/* useEffect(() => {
    if (isOtpVerified) {
        fetchDefaultAddress();
        toast.error('is otp verified to load default address');
        }
    },
    []); */ // runs once on mount

    useEffect(() => {
        if (form.addressType === 'Home') {
            setShowAddressForm(false); // ✅ Close form when Home is reselected
        }
    }, [form.addressType]);
    const isDefaultAddressVisibleInCheckout =
        isOtpVerified &&
        selectedShippingType === 'home' &&
        defaultAddress?.addressType?.toLowerCase() === 'home' &&
        !showAddressForm;
useEffect(() => {
    fetchDefaultAddress();
     console.log("navigate checkout page dir from home sigin :");
     },

    []);
 /*   const deliveryDates: string[] = ["21/11/2025", "22/11/2025"];*/

        const formatToDDMMYYYY = (date: string) => {
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        };

 /*const eligibleProductsByFlag = cartItems.filter(item => item.isEligible);*/

    useEffect(() => {
        if (selectedDate) {
            const hasEligible = cart.some(item =>
                item.deliveryDates?.includes(selectedDate)
            );
            if (!hasEligible) {
                toast.warning("No items available for the selected date");
            }
        }
    }, [selectedDate, cart]);

console.log("Cart before filtering:", cart);
    cart.forEach(item => {
        console.log("Item:", item.name, "Delivery Dates:", item.deliveryDates);
    });

const defaultDates = [
  "05/04/2026", "06/04/2026", "22/04/2026",
  "23/04/2026", "24/04/2026", "25/04/2026"
];
   const updatedCart = cart.map(item => ({
  ...item,
   deliveryDates: item.deliveryDates?.length > 0 ? item.deliveryDates : defaultDates,
    selectedDate: selectedDate, // ✅ assign global selectedDate into each product
    isAvailableOnSelectedDate: item.deliveryDates.includes(selectedDate ?? "") // ✅ availability check


}));
 console.log("Updated Cart-up:", updatedCart);
    updatedCart.forEach(item => {
        console.log("Item-stepup:", item.name, "Delivery Dates stepup:", item.deliveryDates


            );
    });

// TEMP: Inject test dates only if selectedDate is null
  const normalize = (date: string | null): string => {
        if (!date) return "";
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };

const allowedDates = ["21/11/2025", "22/11/2025"];
const eligibleProducts = selectedDate
        ? updatedCart.filter(item =>
            item.deliveryDates?.some(date =>
                normalize(date) === normalize(selectedDate)
            )
        )
        : updatedCart;

    console.log("Eligible Products Final:", eligibleProducts);
    console.log("Selected Date new:", selectedDate);
    updatedCart.forEach(item => {
        const match = item.deliveryDates?.some(date =>
            allowedDates.includes(date)
        );
        console.log("Item new:", item.name, "Match new:", match);
    });

updatedCart.forEach(item => {
        const match = item.deliveryDates?.some(date => normalize(date) === normalize(selectedDate));
        console.log("Item:", item.name, "Match-stepdown:", match);
        console.log("Selected Date:", selectedDate);
        console.log("Normalized Selected Date:", normalize(selectedDate));
        item.deliveryDates?.forEach(date => {
            console.log("Comparing:", normalize(date), "vs", normalize(selectedDate));
        });
 });

    updatedCart.forEach(item => {
        console.log("Item:", item.name, "Delivery Dates----stepdown:", JSON.stringify(item.deliveryDates)


            );
        console.log("Selected Date:", selectedDate);
        console.log("Normalized Selected Date:", normalize(selectedDate));

        item.deliveryDates?.forEach(date => {
            console.log("Comparing:", normalize(date), "vs", normalize(selectedDate));
        });
    });

const normalizedSelectedDate = normalize(selectedDate);
console.log("Selected:", normalizedSelectedDate);
    cart.forEach(item => {
        console.log("Item:", item.name, item.deliveryDates?.map(d => normalize(d)));
    });

const handleRemove = (id: string, price: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id, price } });
    };
  {eligibleProducts.map(item => {
        const filteredDates =
            selectedDate && item.deliveryDates
                ? item.deliveryDates.filter(date => date === selectedDate)
                : item.deliveryDates ;
        console.log("Filtering with selectedDate:", selectedDate);
        console.log("Eligible Products Final:", eligibleProducts);





 return (
            <CartItem
                {...item}
                deliveryDates={filteredDates}
                selectedDate={selectedDate}
                /* isAvailableOnSelectedDate={
                    selectedDate ? item.deliveryDates?.includes(selectedDate) : false
                } */
               isAvailableOnSelectedDate={!!selectedDate}   // ✅ true for all products if a date is chosen

                onRemove={() => handleRemove(item.id, item.quantity)}
            />

        );
    })}

const updatedProducts = eligibleProducts.map(item => ({
  ...item,
  selectedDate: selectedDate // ✅ assign global selectedDate
}));
const [deliveryAddress, setDeliveryAddress] = useState("");
const [paymentMethod, setPaymentMethod] = useState("");
// Reset function
const resetCheckoutState = () =>
{
    setDeliveryAddress(""); setPaymentMethod("");
    };
{/* Paument Mehtod */}
useEffect(() => {
    if (new URLSearchParams(window.location.search).get("retry"))
    { resetCheckoutState(); // clear delivery address + payment method
        }
     }, []);

sessionStorage.removeItem("checkoutState");
   const navigate = useNavigate();
        const handleCheckout = () => {
            if (isUserLoggedIn)
            {
                navigate("/checkout", { state: { isOtpVerified: true } }); // ✅ go straight if logged in
               console.log("navigate checkout page dir from home sigin :",{ state: { isOtpVerified: true } });
                }
            else { setShowAuthModal(true); // ✅ open OTP modal if not
                }
            };


    return (
        <div className="checkout-container">
         <div className="row mb-3">
                    <div className="col-12">
                      <hr className="shoppingcart-line w-100" />
                      <h2 className="shoppingcart">Shipping & Payment</h2>
                      <hr className="shoppingcart-line w-100" />

                </div>
                  </div>
            <div className="checkout-columns">
                <div className="left-column">

                    {/* Shipping method, address form */}



                    <div>
            {showAuthModal && (
                <AuthModal
                    visible={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    mobile={mobile}
                    setMobile={setMobile}
                    otp={otp}
                    setOtp={setOtp}
                    isOtpSent={isOtpSent}
                    cooldownTime={cooldownTime}
                    sendOtp={sendOtp}
                    verifyOtp={verifyOtp}
                    changeNumber={changeNumber}
                />
            )}


{ isUserLoggedIn && (
  <>
{showPaymentSection ? (<div>
  // Payment section

    <div className="shipping-method-box">
    <h4  style={{ display: "flex", alignItems: "center" }}>Shipping method
      <span className="default-badge" style={{ marginLeft: "10px" }}>HOME DELIVERY</span>
     <button
       onClick={() => setShowPaymentSection(false)}
             style={{
               marginLeft: "40px",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.9rem",   // smaller text
                  fontWeight: "normal", // remove bold
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline", // make it look like a link



        }}
      >
        Edit
      </button>
     </h4>
     {defaultAddress ? ( <DefaultAddressCard data={defaultAddress} />
         ) : (
             <ShippingAddress form={form} setForm={setForm}
             onContinue={() => setShowPaymentSection(true)}
              isEditing={isEditing}          // 🔑 added
               setIsEditing={setIsEditing}    // 🔑 added
                showForm={showForm}          // 🔑 pass down
                 setShowForm={setShowForm}    // 🔑 pass down
              /> )}


    {/* <DefaultAddressCard data={defaultAddress} /> */}


    <div className="delivery-message">
      Your order will be delivered on {selectedDate} between 10am to 7pm
    </div> {/* PaymentMethodBox div */}
    </div>
    <PaymentMethodBox
      totalAmount={
        cart.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0) + 249 + 10
      }
    />
      {/* <PaymentMethodBox totalAmount={totalPrice}/> ✅ Payment section isolated */}

</div>
): (
    <div>
       // Checkout state


    <h4>Shipping Method</h4>
    <h5><b>Home Delivery</b></h5>
    <hr className="shoppingcart-line w-100" />
    <p>(Get your product delivered to your home)</p>
   <div>
    <label>
    <input
     type="radio"
      name="shipping"
       value="home"
       checked={selectedShippingType === 'home'}
       onChange={() => setSelectedShippingType('home')}
        />
         Home Delivery
        </label>

          <label>
          <input
           type="radio"
            name="shipping"
             value="pickup"
            checked={selectedShippingType === 'pickup'}
             onChange={() => setSelectedShippingType('pickup')}
             />
             Store Pickup
             </label>
           </div>

         {selectedShippingType === 'home' &&  defaultAddress?.addressType?.toLowerCase()=== 'home'
                              && !showAddressForm ? (
                                  <div className="default-address-box">
                                      <h5><b>Select your shipping address</b></h5>
                                      <p>{defaultAddress.fullName},{defaultAddress.buildingName},{defaultAddress.streetName},</p>
                                      <p> {defaultAddress. city},{defaultAddress. pincode},{defaultAddress.state},</p>
                                      <p> {defaultAddress.landmark},{defaultAddress. addressType},{defaultAddress.useDefault}</p>
                                      <p>Mobile Number:{defaultAddress.mobileNumber}</p>
                                       <p>{defaultAddress.useDefault&& (
                                               <span className="default-badge">Default</span>
                                             )}
                                         </p>
                                     <button onClick={() => setShowAddressForm(true)} className="btn btn-link">
                                          Use a different address
                                      </button>
                                  </div>
                              ) : (
                                  <ShippingAddress
                                  form={form} setForm={setForm} onContinue={() => setShowPaymentSection(true)}
                                      onAddressSaved={() => {
                                          setShowAddressForm(false); // ✅ close the form
                                          fetchDefaultAddress();     // ✅ reload the default address

                                      }}
                                   isEditing={isEditing}          // 🔑 added
                                    setIsEditing={setIsEditing}    // 🔑 added
                                     showForm={showForm}          // 🔑 pass down
                                      setShowForm={setShowForm}    // 🔑 pass down
                                  />

                              )}
                              {!(selectedShippingType === 'home' && defaultAddress?.addressType?.toLowerCase() === 'home' && !showAddressForm) && (
                                  <div className={`default-address-card ${showAddressForm ? 'dimmed' : ''}`}>
                                      <DefaultAddressCard data={defaultAddress} />
                                  </div>
                              )}

                           <p>Choose Your Delivery Date for Electronic Products</p>

                                              <p>Products Eligible for Delivery on Selected Date

                                                <button onClick={() => setShowEligible(!showEligible)}>
                                                  {showEligible ? "Hide Products" : "View Products"}
                                                </button></p>



                                                {showEligible &&(
                                                                  <div className="eligible-products-grid">



                                                   {eligibleProducts.map((item, index) => (

                                               <div key={item.id ?? index} className="eligible-item">

                                                     <div className="cart-row">
                                                       <img src={item.imageSrc} alt={item.productName} className="cart-image" />
                                                       <div className="cart-info">
                                                         <div className="mb-0">Name: {item.name}</div>
                                                         <div className="mb-0">Des: {item.description}</div>
                                                         <div className="mb-0">Qty: {item.quantity}</div>
                                                       </div>
                                                     </div>
                                                   </div>

                                                       ))}
                                                   </div>
                                                   )}
{/* Address form */}
 {/* Products summary */}
         {/* Delivery date picker */}
 <label>Select Delivery Date:</label>
                                 <select onChange={(e) => setSelectedDate(e.target.value)}>
                                     {defaultDates.map((date, index) => (
                                         <option key={index} value={date}>{date}</option>
                                     ))}
                                 </select>
                                  <label>Or pick a custom date:</label>

                                                     <input
                                                         type="date"
                                                         value={selectedDate ? selectedDate.split("/").reverse().join("-") : ""}
                                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                     const raw = e.target.value;
                                                     const formatted = raw.split("-").reverse().join("/"); // "21/11/2025"
                                                     setSelectedDate(formatted);

                                                     if (!formatted) {
                                                         console.log("No selected--- date—skipping filter.");
                                                     }
                                                 }}/>


           {selectedDate && (
           <div className="delivery-message">
             Your order will be delivered on {selectedDate} between 10am to 7pm
           </div>

         )}
         <button
           className="proceed-button"
           onClick={() => setShowPaymentSection(true)}
           disabled={!selectedDate} // ✅ disable until a date is chosen
         >
           Proceed to Payment
         </button>
         {!selectedDate && ( <p className="hint-text">Please select a delivery date to continue</p> )}

         <div className="payment-method-box">
               <h4>Payment method</h4>
               </div>
</div>
    )}
   </>

 )}
</div>
</div>
<div className="right-column">
<CartSummary />
<div><span><strong>Order Summary </strong>
 <button onClick={() => setShoworderEligible(!showorderEligible)}>
   {showorderEligible ? "Hide Details" : "Details"}
 </button>
 </span></div>
                    {/* Order summary, payment */}
 { /* <div className="cart-item"> */}
<div className="rows">
{showorderEligible && eligibleProducts.map((item, index) => (
                           <div key={item.id ?? index} className="order-item">
                             <div className="cart-row">
                               {/* If you want to show image, uncomment below */}
                               <img src={item.imageSrc} alt={item.productName} className="cart-image" />
                               <div className="cart-info">
                                 <div className="mb-0">Name: {item.name}</div>
                                 <div className="mb-0">Des: {item.description}</div>
                                 <div className="mb-0">Qty: {item.quantity}</div>
                                 <div className="mb-0">₹{item.appliedPrice*item.quantity}</div>
                                <div className="mb-0">
                                  {item.selectedDate ? (
                                      item.isAvailableOnSelectedDate ? (
                                        <span className="unavailable">Not Available Delivery Date: {item.selectedDate}</span>
                                      ) : (
                                        <span className="available">  Delivery by: {item.selectedDate}</span>
                                      )
                                    ) : (
                                      <span className="unavailable">No delivery date selected</span>
                                    )}</div>
                               </div>
                             </div>
                           </div>
                         ))}</div>
                     </div>
                      </div>
                      </div>

    );

};

export default Checkout;
