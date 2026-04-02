import React from "react";
import latop from '@img/latop.png';

interface CartItemProps {
    id: string,
    productName: string,
    name: string,
    originalPrice: number,  // ✅ new
    price: number,
    image: string,
    imageSrc: string,
    quantity: number,
    deliveryDates: string[],
    onRemove: (id: string) => void,
    discountPercentage: number,
    appliedPrice: number,
    isAvailableOnSelectedDate?: boolean | undefined,
    selectedDate?: string | null,
    description?: string; // ✅ add this (optional if not always present)
    saved:number










}

export const CartItem: React.FC<CartItemProps> = ({
                                                      id,
                                                      name,
                                                      productName,
                                                      description,
                                                      originalPrice,  // ✅ new
                                                      price,
                                                      imageSrc,
                                                      quantity,
                                                      deliveryDates,
                                                      onRemove,
                                                      appliedPrice,
                                                      discountPercentage,
                                                      selectedDate,
                                                      isAvailableOnSelectedDate,
                                                      saved

                                                  }) => {




    const subtotal = (appliedPrice ?? price) * quantity;

   /* Subtotal: ₹{((item.appliedPrice !== undefined ? item.appliedPrice : item.originalPrice) * item.quantity)}*/




    return (
        <div className="cart-details p-3 border rounded">
            <div className="cart-item">
            <img src={imageSrc || latop} alt={productName} className="cart-image"/>
            {/*  <img src={image|| latop} alt={productName} className="cart-image" />*/}
            <div className="cart-details">
                <h4 className="mb-2 d-flex justify-content-between">{productName}</h4>
                {/*  <p><img src={latop} alt={productName} className="img-fluid mb-3"/></p>*/}
                <div className="mb-2">Product Name:{name}</div>
                <div className="mb-2">Description:{description}</div>
                <div className="mb-2 d-flex justify-content-between"> <span>Total MRP:</span>
                    <span><s>₹<strong>{originalPrice.toFixed(2)}</strong></s></span>
                </div>
                <div className="mb-2 d-flex justify-content-between text-success">
                    <span>Offer discount:</span><span>₹{originalPrice-appliedPrice}</span></div>
                {/*<p>Offer discount:{discountPercentage}% off</p>*/}
                <div className="mb-2 d-flex justify-content-between"><span>AppliedPrice:</span>
                    <span><strong>₹{appliedPrice ?? price}</strong></span></div>
                    <div className="mb-2 d-flex justify-content-between"><span>saved:</span>
                                        <span><strong>₹{saved}</strong></span></div>
                { /* <div className="mb-2 d-flex justify-content-between"><span>Item Shipping:</span>
                   <span><strong>₹{effectiveShippingFee}</strong></span></div> */}
                { /*<div className="mb-2 d-flex justify-content-between"><span>Platform fee:</span>
                    <span><strong>₹{effectivePlatformFee}</strong></span></div> */}

                <div className="mb-2 d-flex justify-content-between">Quantity:<strong>{quantity}</strong></div>
                {/*<p>Total: ₹{((appliedPrice ?? price) * quantity).toFixed(2)}</p>*/}
                <div className="mb-2 d-flex justify-content-between fw-bold text-primary"><span>Total:</span>
                    <span>₹<strong>{ subtotal}</strong></span>
                    </div>

                {/*<p className="card-text fw-semibold">
                     Subtotal: ₹{(item.appliedPrice ?? item.price) * item.quantity}
                </p>*/}
                {/*<p>Available Delivery Dates:</p>*/}
                {selectedDate ? (
                    isAvailableOnSelectedDate ? (
                        <span className="available">Available Delivery Dates: {selectedDate}</span>
                    ) : (
                        <span className="unavailable">Not Available Delivery Dates: {selectedDate}</span>
                    )
                ) : (
                    <span className="unavailable">No delivery date selected</span>
                )}




                <ul>
                    {deliveryDates.map((date, index) => (
                        <li key={index}>{date}</li>
                    ))}
                </ul>

                {onRemove && (
                    <button onClick={() => onRemove(id)}>Remove</button>
                )}


            </div>
        </div>
        </div>
    );
};


