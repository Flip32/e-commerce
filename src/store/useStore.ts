import { create } from 'zustand';
import { CartItem, Product, UserData, PaymentData } from '../types';

interface Store {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    userData: UserData | null;
    setUserData: (data: UserData) => void;
    paymentData: PaymentData | null;
    setPaymentData: (data: PaymentData) => void;
    clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.product.id !== productId),
        })),
    updateQuantity: (productId, quantity) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            ),
        })),
    userData: null,
    setUserData: (data) => set({ userData: data }),
    paymentData: null,
    setPaymentData: (data) => set({ paymentData: data }),
    clearCart: () => set({ cart: [] }),
}));
