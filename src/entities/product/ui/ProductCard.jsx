import { Link } from "react-router-dom";

export function ProductCard({
  product,
  isWished,
  onAddToCart,
  onToggleWishlist,
}) {
  const rating = Number(product.rating ?? 4);
  const price = Number(product.price ?? 0);
  const oldPrice = product.old_price ? Number(product.old_price) : null;

  // Badge
  const badgeLabel = oldPrice ? "Sale" : product.is_new ? "New" : null;
  const badgeMod = oldPrice ? "sale" : "new";

  // Stars
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <article className="product-card">
      {/* Badge */}
      {badgeLabel && (
        <span
          className={`product-card__badge product-card__badge--${badgeMod}`}
        >
          {badgeLabel}
        </span>
      )}

      {/* Wishlist */}
      <button
        className={`product-card__wish-btn${isWished ? " product-card__wish-btn--active" : ""}`}
        onClick={() => onToggleWishlist(product.id)}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWished ? "♥" : "♡"}
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="product-card__image-wrap">
        <img
          src={product.image_url}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </Link>

      {/* Body */}
      <div className="product-card__body">
        <p className="product-card__category">
          {product.category ?? "Snack & Spice"}
        </p>

        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="product-card__rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < fullStars ? "★" : i === fullStars && halfStar ? "☆" : "☆"}
            </span>
          ))}
          <span>({Math.round(rating * 24)})</span>
        </div>

        <p className="product-card__brand">
          By <strong>{product.brand ?? "NestFood"}</strong>
        </p>

        {/* Price + Add */}
        <div className="product-card__meta">
          <div className="prices">
            <span className="product-card__price">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="product-card__old-price">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={() => onAddToCart(product)}
            type="button"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
