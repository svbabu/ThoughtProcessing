import React, { useContext,useEffect,useState } from "react";
{/* import { CartContext } from 'components/cart/CartContext'; */}
import {CartContext} from '@cart/CartContext';

export const CartSummary = () => {
  const { cart } = useContext(CartContext);
  const shippingFee = 249;
  const platformFee = 10;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const offerDiscount = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.appliedPrice) * item.quantity,
    0
  );
  const appliedPrice = cart.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0);
  const totalPrice = appliedPrice + shippingFee + platformFee;
// Inside CartSummary
const [finalTotal, setFinalTotal] = useState(0);
useEffect(() => {
  const total =totalPrice ;
  setFinalTotal(total);
}, [totalPrice]);

  return (
    <div className="cart-summary">
    { /*  <h3>Cart Summary</h3> */}
      <div className="summary-row"><span>Total Items{" "}</span><span>{totalItems}</span></div>{" "}
      <div className="summary-row"><span>Total MRP{" "}</span><span>₹{totalMRP.toFixed(2)}</span></div>{" "}
      <div className="summary-row"><span>Offer Discount{" "}</span><span>-₹{offerDiscount.toFixed(2)}</span></div>{" "}
      {/* <div className="summary-row"><span>Applied Price:</span><span>₹{appliedPrice.toFixed(2)}</span></div> */}
      <div className="summary-row"><span>Shipping Fee{" "}</span><span>₹{shippingFee}</span></div>{" "}
      <div className="summary-row"><span>Platform Fee{" "}</span><span>₹{platformFee}</span></div>{" "}
      <div className="summary-row total"><strong>Total Pay{" "}</strong><strong>₹{totalPrice.toFixed(2)}</strong></div>
    </div>
  );
};

