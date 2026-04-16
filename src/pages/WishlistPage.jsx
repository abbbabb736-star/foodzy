import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductsQuery } from '../entities/product/queries/useProductsQuery';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCartStore } from '../store/useCartStore';
import { useMinLoading } from '../shared/hooks/useMinLoading';

function productImage(item) {
  return item.image_url || `https://picsum.photos/seed/wish-${item.id}/320/320`;
}

export function WishlistPage() {
  const { t } = useTranslation();
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const productsQuery = useProductsQuery({ limit: 100 });
  const showLoading = useMinLoading(productsQuery.isLoading, 1200);

  const wishedProducts = (productsQuery.data ?? []).filter((item) =>
    wishlistIds.includes(item.id),
  );

  return (
    <div className="wishlist-page">
      <div className="page-banner">
        <div className="container page-banner__inner">
          <h1>{t('wishlist.title')}</h1>
          <nav className="page-breadcrumb">
            <Link to="/">{t('breadcrumb.home')}</Link>
            <span>—</span>
            <span>{t('wishlist.title')}</span>
          </nav>
        </div>
      </div>

      <div className="container page-section wishlist-page__section">
        {wishlistIds.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon" aria-hidden="true">
              ♥
            </div>
            <h2 className="wishlist-empty__title">{t('wishlist.emptyTitle')}</h2>
            <p className="wishlist-empty__text">
              {t('wishlist.emptyText')}
            </p>
            <Link to="/catalog" className="wishlist-empty__cta">
              {t('wishlist.browse')}
            </Link>
          </div>
        ) : (
          <>
            {!showLoading ? (
              <p className="wishlist-page__count">
                {t('wishlist.savedCount', { count: wishedProducts.length })}
              </p>
            ) : null}

            <div className="wishlist-grid">
              {showLoading
                ? Array.from({ length: 6 }, (_, index) => (
                    <article
                      key={`wish-skel-${index}`}
                      className="wishlist-card wishlist-card--skeleton"
                      aria-hidden="true"
                    >
                      <div className="wishlist-card__media">
                        <Skeleton height={160} />
                      </div>
                      <div className="wishlist-card__body">
                        <Skeleton width="40%" />
                        <Skeleton width="92%" />
                        <Skeleton width={72} />
                        <div className="wishlist-card__actions">
                          <Skeleton height={38} />
                          <Skeleton height={38} width={88} />
                        </div>
                      </div>
                    </article>
                  ))
                : wishedProducts.map((item) => (
                    <article key={item.id} className="wishlist-card">
                      <Link
                        to={`/product/${item.id}`}
                        className="wishlist-card__media"
                        aria-label={`View ${item.title}`}
                      >
                        <img src={productImage(item)} alt="" loading="lazy" />
                      </Link>
                      <div className="wishlist-card__body">
                        {item.category_name ? (
                          <span className="wishlist-card__category">
                            {item.category_name}
                          </span>
                        ) : null}
                        <Link to={`/product/${item.id}`} className="wishlist-card__title">
                          {item.title}
                        </Link>
                        <div className="wishlist-card__price-row">
                          <strong className="wishlist-card__price">
                            ${Number(item.price ?? 0).toFixed(2)}
                          </strong>
                          {item.old_price ? (
                            <span className="wishlist-card__old">
                              ${Number(item.old_price).toFixed(2)}
                            </span>
                          ) : null}
                        </div>
                        <div className="wishlist-card__actions">
                          <button
                            type="button"
                            className="wishlist-card__btn wishlist-card__btn--primary"
                            onClick={() => addToCart(item, 1)}
                          >
                            {t('wishlist.addToCart')}
                          </button>
                          <button
                            type="button"
                            className="wishlist-card__btn wishlist-card__btn--ghost"
                            onClick={() => toggleWishlist(item.id)}
                            aria-label={t('wishlist.remove')}
                          >
                            {t('wishlist.remove')}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
            </div>

            {!showLoading && wishedProducts.length === 0 && wishlistIds.length > 0 ? (
              <p className="wishlist-page__hint">
                {t('wishlist.hint')}{' '}
                <Link to="/catalog">{t('wishlist.openCatalog')}</Link>
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
