import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  wishlistIds: [],
  addToCart(product) {
    const exists = get().items.some((item) => item.id === product.id);

    if (exists) {
      return;
    }

    set((state) => ({
      items: [...state.items, product],
    }));
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
}));
