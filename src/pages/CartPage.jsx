import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductsQuery } from '../entities/product/queries/useProductsQuery';
import { ProductCard } from '../entities/product/ui/ProductCard';
import { ProductCardSkeleton } from '../entities/product/ui/ProductCardSkeleton';
import { useMinLoading } from '../shared/hooks/useMinLoading';
import { useCartStore } from '../store/useCartStore';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);

  const [removingIds, setRemovingIds] = useState(() => new Set());
  const [justAddedIds, setJustAddedIds] = useState(() => new Set());
  const prevIdsRef = useRef(new Set());

  const productsQuery = useProductsQuery({ limit: 4 });
  const popularProducts = useMemo(() => productsQuery.data ?? [], [productsQuery.data]);
  const showPopularLoading = useMinLoading(productsQuery.isLoading, 1200);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity ?? 1),
    0
  );

  useEffect(() => {
    const prevIds = prevIdsRef.current;
    const currentIds = new Set(items.map((item) => item.id));
    const newlyAdded = [];

    currentIds.forEach((id) => {
      if (!prevIds.has(id)) {
        newlyAdded.push(id);
      }
    });

    prevIdsRef.current = currentIds;

    if (newlyAdded.length === 0) {
      return undefined;
    }

    const start = window.setTimeout(() => {
      setJustAddedIds((prev) => {
        const next = new Set(prev);
        newlyAdded.forEach((id) => next.add(id));
        return next;
      });
    }, 0);

    const stop = window.setTimeout(() => {
      setJustAddedIds((prev) => {
        const next = new Set(prev);
        newlyAdded.forEach((id) => next.delete(id));
        return next;
      });
    }, 700);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [items]);

  function handleRemove(productId) {
    setRemovingIds((prev) => {
      const next = new Set(prev);
      next.add(productId);
      return next;
    });

    window.setTimeout(() => {
      removeFromCart(productId);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 220);
  }

  return (
    <section className="container page-section cart-page">
      <h2 className="section-title">Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link className="cart-btn cart-btn--primary" to="/catalog">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-table-wrap">
            <div className="cart-table cart-table__head" aria-hidden="true">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Action</div>
            </div>
            <div className="cart-table cart-table__body">
              {items.map((item) => {
                const qty = Number(item.quantity ?? 1);
                const rowTotal = Number(item.price ?? 0) * qty;
                const isRemoving = removingIds.has(item.id);
                const isJustAdded = justAddedIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`cart-row${isRemoving ? ' is-removing' : ''}${isJustAdded ? ' is-added' : ''}`}
                  >
                    <div className="cart-product">
                      <div className="cart-product__thumb" aria-hidden="true">
                        <img
                          src={item.image_url || `https://picsum.photos/seed/cart-${item.id}/120/120`}
                          alt=""
                          aria-hidden="true"
                        />
                      </div>
                      <div className="cart-product__meta">
                        <p className="cart-product__title">{item.title}</p>
                      </div>
                    </div>

                    <div className="cart-cell">${Number(item.price ?? 0).toFixed(2)}</div>

                    <div className="cart-qty">
                      <button type="button" onClick={() => updateQuantity(item.id, qty - 1)}>
                        -
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, qty + 1)}>
                        +
                      </button>
                    </div>

                    <div className="cart-cell cart-cell--total">${rowTotal.toFixed(2)}</div>

                    <div className="cart-actions">
                      <button type="button" className="cart-icon-btn" onClick={() => handleRemove(item.id)} aria-label="Remove">
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cart-footer">
            <Link to="/catalog" className="cart-link">
              Continue Shopping
            </Link>
            <div className="cart-footer__right">
              <p className="cart-total">
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
              <button type="button" className="cart-btn cart-btn--ghost" onClick={clearCart}>
                Clear
              </button>
              {items.length === 0 ? (
                <button type="button" className="cart-btn cart-btn--primary" disabled>
                  Check Out
                </button>
              ) : (
                <Link to="/checkout" className="cart-btn cart-btn--primary">
                  Check Out
                </Link>
              )}
            </div>
          </div>

          <div className="cart-popular">
            <h2 className="section-title">Popular Products</h2>
            <p className="cart-popular__sub">
              Explore more products while your cart is ready.
            </p>
            <div className="cart-popular__grid">
              {showPopularLoading
                ? Array.from({ length: 4 }, (_, index) => <ProductCardSkeleton key={`cart-skel-${index}`} />)
                : popularProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWished={wishlistIds.includes(product.id)}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
