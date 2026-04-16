import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useProductByIdQuery } from '../entities/product/queries/useProductByIdQuery';
import { useMinLoading } from '../shared/hooks/useMinLoading';
import { useCartStore } from '../store/useCartStore';

export function ProductPage() {
  const { productId } = useParams();
  const productQuery = useProductByIdQuery(productId);
  const showLoading = useMinLoading(productQuery.isLoading, 900);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const toggleCompare = useCartStore((state) => state.toggleCompare);
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const compareIds = useCartStore((state) => state.compareIds);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [shareText, setShareText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('60g');
  const [minPrice] = useState('0');
  const [maxPriceDraft, setMaxPriceDraft] = useState('300');
  const [maxPriceApplied, setMaxPriceApplied] = useState('300');

  useEffect(() => {
    if (!showLoading && productQuery.data) {
      const t = window.setTimeout(() => setShowContent(true), 40);
      return () => window.clearTimeout(t);
    }
  }, [showLoading, productQuery.data]);

  const images = useMemo(() => {
    const product = productQuery.data;
    if (!product) return [];

    const list = [];
    if (product.image_url) list.push(product.image_url);
    if (Array.isArray(product.images)) {
      product.images.forEach((url) => {
        if (url && !list.includes(url)) list.push(url);
      });
    }
    if (list.length === 0) list.push(`https://picsum.photos/seed/product-${product.id}/900/600`);
    return list;
  }, [productQuery.data]);

  if (showLoading) {
    return (
      <section className="container page-section">
        <div className="catalog-layout">
          <aside className="catalog-sidebar" aria-hidden="true">
            <div className="catalog-filters__group">
              <Skeleton width={160} />
              <Skeleton height={220} />
            </div>
          </aside>
          <div className="catalog-main" aria-hidden="true">
            <div className="product-detail">
              <div className="product-detail__gallery">
                <div className="product-detail__main-img">
                  <Skeleton height="100%" />
                </div>
                <div className="product-detail__thumbs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="product-detail__thumb">
                      <Skeleton height="100%" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-detail__panel">
                <h2>
                  <Skeleton width="82%" />
                </h2>
                <p>
                  <Skeleton width="65%" />
                </p>
                <Skeleton height={120} />
                <Skeleton width={220} height={38} />
              </div>
            </div>
            <div className="product-detail__tabs">
              <Skeleton width={320} height={34} />
              <Skeleton count={4} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <section className="container page-section">
        <p>Product not found.</p>
        <Link to="/catalog">Back to catalog</Link>
      </section>
    );
  }

  const product = productQuery.data;
  const mainImageUrl = activeImage || images[0] || `https://picsum.photos/seed/product-${product.id}/900/600`;
  const isWished = wishlistIds.includes(product.id);
  const isCompared = compareIds.includes(product.id);
  const rating = Number(product.rating ?? 0);
  const reviewCount = Math.max(1, Math.round(rating * 18));

  const WEIGHTS = ['50g', '60g', '80g', '120g', '200g'];

  async function handleShare() {
    const shareUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareText('Link copied');
    } catch {
      setShareText('Copy failed');
    }
  }

  return (
    <section className={`container page-section product-detail-page${showContent ? ' is-loaded' : ''}`}>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h3 className="catalog-sidebar__title">Product Category</h3>
          <div className="catalog-filters__group catalog-filters__group--static">
            <div className="catalog-filters__options">
              <label>
                <input type="checkbox" readOnly /> Juice & Drinks <span>(20)</span>
              </label>
              <label>
                <input type="checkbox" readOnly /> Dairy & Milk <span>(54)</span>
              </label>
              <label>
                <input type="checkbox" readOnly /> Snack & Spice <span>(84)</span>
              </label>
            </div>
          </div>

          <div className="catalog-filters__group">
            <span>Filter By Price</span>
            <p className="catalog-filters__price-label">
              Price : <strong>${minPrice}</strong> – <strong>${maxPriceApplied}</strong>
            </p>
            <div className="catalog-filters__price-row">
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={maxPriceDraft}
                onChange={(event) => setMaxPriceDraft(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="catalog-filters__apply"
              onClick={() => setMaxPriceApplied(maxPriceDraft)}
            >
              Filter
            </button>
          </div>

          <div className="catalog-filters__group catalog-filters__group--static">
            <span>Weight</span>
            <div className="catalog-filters__options">
              <label>
                <input type="checkbox" readOnly /> 2kg Pack
              </label>
              <label>
                <input type="checkbox" readOnly /> 20kg Pack
              </label>
              <label>
                <input type="checkbox" readOnly /> 30kg Pack
              </label>
            </div>
          </div>

          <div className="catalog-filters__group catalog-filters__group--static">
            <span>Products Tags</span>
            <div className="catalog-filters__tags">
              <button type="button">Vegetables</button>
              <button type="button">Juice</button>
              <button type="button">Food</button>
              <button type="button">Dry Fruits</button>
            </div>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="product-detail">
            <div className="product-detail__gallery">
              <div className="product-detail__main-img">
                <img src={mainImageUrl} alt={product.title} />
              </div>
              <div className="product-detail__thumbs">
                {images.slice(0, 6).map((url) => (
                  <button
                    key={url}
                    type="button"
                    className={`product-detail__thumb${
                      (activeImage || images[0]) === url ? ' is-active' : ''
                    }`}
                    onClick={() => setActiveImage(url)}
                    aria-label="Select image"
                  >
                    <img src={url} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail__panel">
              <h2 className="product-detail__title">{product.title}</h2>

              <div className="product-detail__rating">
                <span className="stars" aria-hidden="true">
                  {'★★★★★'.slice(0, Math.max(1, Math.round(rating)))}
                </span>
                <span className="count">({reviewCount} Review)</span>
              </div>

              <div className="product-detail__facts">
                <div>
                  <span>Brand</span>
                  <strong>{product.brand || 'ESTA BETTERU CO'}</strong>
                </div>
                <div>
                  <span>SKU</span>
                  <strong>{product.sku || `SKU-${product.id}`}</strong>
                </div>
                <div>
                  <span>Category</span>
                  <strong>{product.category_name || product.category_id || 'Vegetarian'}</strong>
                </div>
              </div>

              <div className="product-detail__price-row">
                <strong className="price">${Number(product.price ?? 0).toFixed(2)}</strong>
                {product.old_price ? (
                  <span className="old">${Number(product.old_price).toFixed(2)}</span>
                ) : null}
              </div>

              <div className="product-detail__weights">
                <p className="product-detail__weights-label">Size/Weight :</p>
                <div className="product-detail__weights-row">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      className={`weight-btn${selectedWeight === w ? ' is-active' : ''}`}
                      onClick={() => setSelectedWeight(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-detail__buy-row">
                <div className="product-detail__qty">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="product-detail__add"
                  onClick={() => addToCart({ ...product, selectedWeight }, quantity)}
                >
                  Add To Cart
                </button>

                <div className="product-detail__icon-actions">
                  <button
                    type="button"
                    className={`icon-btn${isWished ? ' is-active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                  >
                    ♥
                  </button>
                  <button
                    type="button"
                    className={`icon-btn${isCompared ? ' is-active' : ''}`}
                    onClick={() => toggleCompare(product.id)}
                    aria-label="Compare"
                  >
                    ⇄
                  </button>
                  <button type="button" className="icon-btn" onClick={handleShare} aria-label="Share">
                    ⤴
                  </button>
                </div>
              </div>

              {shareText ? <p className="product-detail__share">{shareText}</p> : null}
            </div>
          </div>

          <div className="product-detail__tabs">
            <div className="product-detail__tab-buttons">
              <button
                type="button"
                className={activeTab === 'description' ? 'is-active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                type="button"
                className={activeTab === 'information' ? 'is-active' : ''}
                onClick={() => setActiveTab('information')}
              >
                Information
              </button>
              <button
                type="button"
                className={activeTab === 'reviews' ? 'is-active' : ''}
                onClick={() => setActiveTab('reviews')}
              >
                Review
              </button>
            </div>

            <div className="product-detail__tab-body">
              {activeTab === 'description' ? (
                <>
                  <p>{product.description || 'No description available.'}</p>
                  <h4>Packaging & Delivery</h4>
                  <p>
                    We deliver fresh products with secure packaging. Delivery time depends on your
                    location and selected shipping option.
                  </p>
                </>
              ) : null}

              {activeTab === 'information' ? (
                <div className="product-detail__info-grid">
                  <div>
                    <span>Brand</span>
                    <strong>{product.brand || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span>SKU</span>
                    <strong>{product.sku || 'N/A'}</strong>
                  </div>
                  <div>
                    <span>Stock</span>
                    <strong>{product.stock ?? 'N/A'}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{product.weight ? `${product.weight}g` : selectedWeight}</strong>
                  </div>
                </div>
              ) : null}

              {activeTab === 'reviews' ? (
                <p>Customer reviews are coming soon for this product.</p>
              ) : null}
            </div>
          </div>

          <Link to="/catalog" className="product-detail__back">
            Back to shop
          </Link>
        </div>
      </div>
    </section>
  );
}
