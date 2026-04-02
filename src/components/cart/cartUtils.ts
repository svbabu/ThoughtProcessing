import { CartItem } from 'components/cart/CartContext'; // adjust path if needed

export const addItemToCart = (cartItems: CartItem[], product: CartItem): CartItem[] => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
        return cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...cartItems, { ...product, quantity: 1 }];
};

export const removeItemFromCart = (cartItems: CartItem[], productId: string): CartItem[] => {
    return cartItems.filter((item) => item.id !== productId);
};

export const updateItemQuantity = (
    cartItems: CartItem[],
    productId: string,
    quantity: number
): CartItem[] => {
    return cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
    );
};

export const calculateCartTotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
