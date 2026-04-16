import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProductCardSkeleton() {
  return (
    <article className="product-card product-card-skeleton" aria-hidden="true">
      <div className="product-card__image-wrap">
        <Skeleton height="100%" />
      </div>
      <p className="product-card__category">
        <Skeleton width="45%" />
      </p>
      <h3 className="product-card__title">
        <Skeleton count={2} />
      </h3>
      <p className="product-card__description">
        <Skeleton width="92%" />
      </p>
      <p className="product-card__rating">
        <Skeleton width="60%" />
      </p>
      <div className="product-card__meta">
        <Skeleton width={60} />
        <Skeleton width={54} />
      </div>
      <div className="product-card__actions">
        <Skeleton height={26} />
        <Skeleton height={26} width={34} />
      </div>
    </article>
  );
}
