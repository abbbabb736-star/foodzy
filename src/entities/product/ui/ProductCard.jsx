export function ProductCard({ product, isWished, onAddToCart, onToggleWishlist }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image_url} alt={product.title} className="product-card__image" />
      </div>
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__description">{product.description ?? 'Fresh and high quality product.'}</p>
      <div className="product-card__meta">
        <strong>${Number(product.price ?? 0).toFixed(2)}</strong>
        <span className="product-card__old-price">
          {product.old_price ? `$${Number(product.old_price).toFixed(2)}` : ''}
        </span>
      </div>

      <div className="product-card__actions">
        <button type="button" onClick={() => onAddToCart(product)}>
          Add to cart
        </button>
        <button type="button" onClick={() => onToggleWishlist(product.id)}>
          {isWished ? 'In wishlist' : 'Wishlist'}
        </button>
      </div>
    </article>
  );
}
