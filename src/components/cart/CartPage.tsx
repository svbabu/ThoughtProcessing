//cartpage tsx backup
import React, {useState} from 'react';
import {CartItem, useCart} from '@cart/CartContext';
import {toast} from 'react-toastify';
import latop from '@img/latop.png';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@cart/useCheckout';
import { useOtpAuth } from '@cart/useOtpAuth';
import { AuthModal } from '@cart/AuthModal';
import {CartSummary} from '@cart/CartSummary';
import  PaymentMethodBox  from "@cart/PaymentMethodBox";
import { auth } from '../../firebase'; // ✅ already initialized
  import { useAuth } from "@cart/AuthProvider";


import { CartItemType } from '../../typed/Product';


export const CartPage: React.FC = () => {

const { cart, dispatch } = useCart();
    const navigate = useNavigate();


    const [showAuthModal, setShowAuthModal] = useState(false);


    // ✅ Use fallback logic for totals
    const totalPrice = cart.reduce(
        (sum, item) => sum + (item.appliedPrice ?? item.originalPrice) * item.quantity,
        0
    );

    const originalTotal = cart.reduce(
        (sum, item) => sum + item.originalPrice * item.quantity,
        0
    );

    const discountedTotal = cart.reduce(
        (sum, item) => sum + (item.appliedPrice ?? item.originalPrice) * item.quantity,
        0
    );

    const saved = originalTotal - discountedTotal;


    // ✅ Increment should add to existing quantity
    const handleAddToCart = (item: CartItem) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: { ...item, quantity: item.quantity + 1, imageSrc: latop }
        });
    };

    const handleIncrement = (item: CartItem) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: item });
    };



    const handleDecrement = (item: CartItem) => {
        dispatch({ type: 'DECREMENT_ITEM',  payload: item });
    };

    const handleRemove = (item: CartItem) => {
        dispatch({ type: 'REMOVE_ITEM',  payload: item  });
        toast.success(`${item.name} removed from cart!`);
    };

    const handleClear = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

const { isUserLoggedIn } = useAuth();
    const handleCheckoutClick = () => {
        if (isUserLoggedIn) { navigate("/checkout", { state: { isOtpVerified: true } }); // ✅ go straight if logged in
          }
       else {
           setShowAuthModal(true); // ✅ open OTP modal if not }
       }


    };
 const useSecureCheckout = () => {
        const navigate = useNavigate();
        const [showAuthModal, setShowAuthModal] = useState(false);
        const [isOtpVerified, setIsOtpVerified] = useState(false);

        const handleCheckout = () => {
            if (!isOtpVerified) {
                setShowAuthModal(true);
            } else {
                navigate('/checkout', { state: { isOtpVerified: true } });
            }
        };

        return { handleCheckout, showAuthModal, setShowAuthModal, isOtpVerified, setIsOtpVerified };
    };



    const handleQuantityChange = (id: string, quantity: number, productName: string) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id, quantity }
        });
        toast.info(`Quantity updated for ${productName}`, {
            position: 'bottom-left',
            icon: <span>🛒</span> ,// ✅ This is a valid ToastIcon


            theme: 'colored'
        });


    };
    const productImages: Record<string, string> = {
        "Laptop": latop

    };
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




    return (
        <div className="checkout-container">

          {/* Heading row */}
       <div className="row mb-3">
            <div className="col-12">
              <hr className="shoppingcart-line w-100" />
              <h2 className="shoppingcart">Your Shopping Cart</h2>
              <hr className="shoppingcart-line w-100" />

        </div>
          </div>


         <div className="checkout-columns">

            <div className=" col-md-8">
             <div className="left-column p-4">
                 <p>Testing Your shopping cart is display  on left column </p>
             <div style={{ padding: '2rem' }}>
            {cart.length === 0 ? (
                <div><p><strong>Your Shopping Cart is empty 🛒</strong></p>
                <p><strong>Your home is waiting for the best furniture & decor !</strong></p>
                <p><strong>Choose from the departments below and start shopping now Your Shopping Cart is empty!</strong></p></div>
            ) : (
                <>
                    <ul style={{ listStyle: 'none', padding: 0
                    }}>
                       {cart.map(item => (
                            <li key={`${item.id}-${item.appliedPrice}`} className="mb-3">
                                  {/* <div className="card mb-3"  key={`${item.id}-${item.appliedPrice}`}> */}
                             <div className="card">
                               <div className="row g-0 align-items-center">
                                   {/*  <div className="row g-0"> */}
                                  <div className="d-flex justify-content-between align-items-start cart-row">
                                     <div className="col-md-3">
                                       <img src={item.imageSrc} alt={item.name}
                                       className="img-fluid rounded-start"
                                       style={{ objectFit: 'cover', height: '70%', width: '70%' }}/>
                                       </div>
                                             <div className="col-md-9">
                                            <div className="card-body">
                                             <h5 className="card-title">{item.name}</h5>
                                            <p>
                                             <span className="text-muted text-decoration-line-through">
                                              ₹{item.originalPrice}
                                      </span>{' '}
                                            <span className="text-dark fw-bold">₹{item.appliedPrice}</span>{' '}
                                            <span className="text-success fw-bold">₹{item.originalPrice-item.appliedPrice} saved</span>
                                          </p>
                                           <p> Colour:White</p>
                                             <div className="d-flex justify-content-between align-items-center mt-2">
                                             <span className="text-dark">Choose delivery date at checkout</span>
                                              <div>
                                              <span className="fw-bold me-2">Qty: {item.quantity}</span>
                                              <button onClick={() => handleDecrement(item)} className="btn btn-dark btn-sm px-3 me-2">-</button>
                                               <button onClick={() => handleIncrement(item)} className="btn btn-dark btn-sm px-3">+</button>
                                               </div>
                                               </div>
                                               <div className="d-flex align-items-start gap-2">
                                               <button onClick={() => handleRemove(item)} className="btn btn-danger">Remove</button>
                                                  {/*Remove div*/}
                                            </div>
                                            {/* card-title div */}
                                        </div>
                                       {/* align-items-start cart-row */}
                                      </div>

                            </div>

                                    </div>
                                    </div>
                           </li>
                        ))}
                     </ul>
        <h3>Total: ₹{totalPrice}</h3>
                    <div className="d-flex gap-2">

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
<button onClick={handleClear}>Clear Cart</button>

                     {/*  d-flex gap-2 */}

                    </div>

                </>
            )}
            {/*<div id="recaptcha-container"></div>*/}
             {/*<div id="recaptcha-container" style={{ display: 'none' }}></div>*/}

      {/* style-padding*/}
     </div>
        {/* left-column*/}
        </div>
           {/* col-md-8*/}
        </div>


          <div className=" col-md-4">


        <div className="right-column p-4 d-flex flex-column align-items-center">
         <p>Smart card on cart summary </p>
           <>


          <CartSummary  />

           </>


          <button className="btn btn-success my-3" onClick={handleCheckoutClick}>
            Checkout now
          </button>


          <div className="voucher-info mt-3 text-center">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="bi bi-gift-fill me-2 text-danger"></i>
              <strong>Gift Box Offers for you!</strong>
            </div>
            <p className="mb-1">Select, choose,
            </p>
            <p>and apply voucher in 2 simple steps.</p>
          </div>
        </div>
        </div>






         {/* </div> */}
          {/* </div> */}
         {/* checkout-columns*/}
        </div>
{/* div-container*/}
</div>



    );
};

export default CartPage;
