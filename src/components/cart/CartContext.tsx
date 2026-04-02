import React, { createContext, useContext, useReducer } from 'react';

// 1. Define cart item type
export interface CartItem {
    discountPercentage: number;
    image: string ;
    imageSrc: string;
    appliedPrice: any;
    productName: string ;
    description?: string; // ✅ add this (optional if not always present)
    originalPrice: number;   // ✅ new
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    deliveryDates: string[]; // ✅ Add this line
    date:string;
    selectedDate?: string | null;
    saved:number





}

// 2. Define actions
type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | {  type:'INCREMENT_ITEM';payload:CartItem}
    | { type: 'DECREMENT_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { id: string; price: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }







// 3. Reducer function
export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
      case 'ADD_ITEM': {
          const existing = state.find(
              item => item.id === action.payload.id && item.price === action.payload.price
          );
          if (existing) {
              return state.map(item =>
                  item.id === action.payload.id && item.price === action.payload.price
                     /* ? { ...item, quantity: item.quantity + action.payload.quantity }*/
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
              );
          }


          return [...state, { ...action.payload, quantity: 1 }];
        /*  return [...state, action.payload];*/
      }

      case 'INCREMENT_ITEM': {
          return state.map(item =>
              item.id === action.payload.id && item.price === action.payload.price
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
          )
             /* .filter(item => item.quantity > 0);*/

      }



      case 'DECREMENT_ITEM': {
          return state.map(item =>
              item.id === action.payload.id && item.price === action.payload.price
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
          ).filter(item => item.quantity > 0);
      }





      case 'REMOVE_ITEM': {
          return state.filter(
              item => item.id !== action.payload.id || item.price !== action.payload.price
          );
      }
 case 'UPDATE_QUANTITY':
   return state.map(item =>
     item.id === action.payload.id
       ? { ...item, quantity: action.payload.quantity }
       : item
   );






      case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// 4. Create context
export const CartContext = createContext<{
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}>({ cart: [], dispatch: () => null });

// 5. Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// 6. Custom hook
export const useCart = () => useContext(CartContext);
