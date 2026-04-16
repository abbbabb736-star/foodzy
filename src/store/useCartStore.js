import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      wishlistIds: [],
      compareIds: [],
      addToCart(product, quantity = 1) {
        const normalizedQty = Math.max(1, Number(quantity) || 1);
        const existingItem = get().items.find((item) => item.id === product.id);

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity ?? 1) + normalizedQty }
                : item
            ),
          }));
          return;
        }

        set((state) => ({
          items: [...state.items, { ...product, quantity: normalizedQty }],
        }));
      },
      removeFromCart(productId) {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity(productId, quantity) {
        const normalizedQty = Math.max(1, Number(quantity) || 1);
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity: normalizedQty } : item
          ),
        }));
      },
      clearCart() {
        set({ items: [] });
      },
      toggleWishlist(productId) {
        set((state) => {
          const exists = state.wishlistIds.includes(productId);

          return {
            wishlistIds: exists
              ? state.wishlistIds.filter((id) => id !== productId)
              : [...state.wishlistIds, productId],
          };
        });
      },
      toggleCompare(productId) {
        set((state) => {
          const exists = state.compareIds.includes(productId);
          return {
            compareIds: exists
              ? state.compareIds.filter((id) => id !== productId)
              : [...state.compareIds, productId],
          };
        });
      },
    }),
    {
      name: "exam7-shop",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        wishlistIds: state.wishlistIds,
        compareIds: state.compareIds,
      }),
    }
  )
);
