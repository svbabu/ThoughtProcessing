import React from 'react';
import { useCart } from 'components/cart/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // or any icon library

const CartIcon: React.FC = () => {
    const { cart } = useCart();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaShoppingCart size={24} />
            <span
                style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                }}
            >
        {itemCount}
      </span>
        </div>
    );
};


