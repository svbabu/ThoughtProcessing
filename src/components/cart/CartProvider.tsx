import React, { createContext, useContext, useReducer, useEffect } from "react";

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description?: string;
  discountPercentage?: number;
  originalPrice?: number;
  deliveryDates?: string[];
  selectedDate?: string | null;
}

// Actions
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREMENT_ITEM"; payload: CartItem }
  | { type: "DECREMENT_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; price: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Reducer
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(
        item => item.id === action.payload.id && item.price === action.payload.price
      );
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id && item.price === action.payload.price
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "INCREMENT_ITEM":
      return state.map(item =>
        item.id === action.payload.id && item.price === action.payload.price
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREMENT_ITEM":
      return state
        .map(item =>
          item.id === action.payload.id && item.price === action.payload.price
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
    case "REMOVE_ITEM":
      return state.filter(
        item => item.id !== action.payload.id || item.price !== action.payload.price
      );
    case "UPDATE_QUANTITY":
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Context
export const CartContext = createContext<{
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}>({ cart: [], dispatch: () => null });

// Provider with persistence + cross-tab sync
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializer = () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  };

  const [cart, dispatch] = useReducer(cartReducer, [], initializer);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cross-tab sync
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "cart" && event.newValue) {
        const parsed = JSON.parse(event.newValue);
        dispatch({ type: "CLEAR_CART" });
        parsed.forEach((item: CartItem) =>
          dispatch({ type: "ADD_ITEM", payload: item })
        );
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
