import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function itemKey(productId: string, variantId?: string): string {
  return `${productId}_${variantId ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const key = itemKey(item.productId, item.variantId);
        const existing = get().items.find(
          (i) => itemKey(i.productId, i.variantId) === key,
        );
        console.log(
          "[cartStore] addItem:",
          item.name,
          item.variantLabel ?? "no-variant",
          "| price:",
          item.price,
          "| existing:",
          !!existing,
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              itemKey(i.productId, i.variantId) === key
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },

      removeItem: (productId, variantId) => {
        const key = itemKey(productId, variantId);
        console.log("[cartStore] removeItem key:", key);
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.variantId) !== key,
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        const key = itemKey(productId, variantId);
        console.log(
          "[cartStore] updateQuantity key:",
          key,
          "-> qty:",
          quantity,
        );
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.productId, i.variantId) === key ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => {
        console.log("[cartStore] clearCart");
        set({ items: [] });
      },

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => {
        const total = get().items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        console.log("[cartStore] totalPrice:", total);
        return total;
      },
    }),
    {
      name: "farm72-cart",
    },
  ),
);
