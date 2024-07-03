import create from "zustand";
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { Product as ProductType } from "@chec/commerce.js/types/product";
import { commerce } from "./Commerce";

type CartState = {
  cart: CartType | null; // Adjusted to allow for initial undefined state
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItemQuantity: (LineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  emptyCart: () => Promise<void>;
};

type ProductState = {
  product: ProductType[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
    cart: null, // Initialize cart as null or with a default value
    loading: true,
    fetchCart: async () => {
        try {
            const cart = await commerce.cart.retrieve();
            set({ cart, loading: false });
        } catch (error) {
            console.error('Error fetching cart: ', error);
        }
    },
    addItem: async (productId, quantity) => {
        try {
            const { cart } = await commerce.cart.add(productId, quantity);
            set({ cart });
        } catch (error) {
            console.error('Error adding item to cart: ', error);
        }
    },
    updateItemQuantity: async (lineItemId, quantity) => {
        try {
            const { cart } = await commerce.cart.update(lineItemId, { quantity });
            set({ cart });
        } catch (error) {
            console.error('Error updating item quantity: ', error);
        }
    },
    removeItem: async (lineItemId) => {
        try {
            const { cart } = await commerce.cart.remove(lineItemId);
            set({ cart });
        } catch (error) {
            console.error('Error removing item from cart: ', error);
        }
    },
    emptyCart: async () => {
        try {
            const { cart } = await commerce.cart.empty();
            set({ cart });
        } catch (error) {
            console.error('Error emptying cart: ', error);
        }
    }
}));

export const useProductStore = create<ProductState>((set) => ({
    product: [],
    loading: true,
    fetchProducts: async () => {
        try {
            const { data } = await commerce.products.list();
            set({ product: data, loading: false });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
}));
