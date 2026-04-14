import { useMemo } from 'react';
import { useCatalogSearchParams } from '../shared/hooks/useCatalogSearchParams';
import { useProductsQuery } from '../entities/product/queries/useProductsQuery';
import { useCategoriesQuery } from '../entities/category/queries/useCategoriesQuery';
import { CatalogFilters } from '../features/catalog/ui/CatalogFilters';
import { ProductCard } from '../entities/product/ui/ProductCard';
import { useCartStore } from '../store/useCartStore';
import { getEnvConfig } from '../services/env';
import { perks, promoCards } from '../shared/config/homeSections';

function mapProductImage(product) {
  if (product.image_url) {
    return product.image_url;
  }

  // Fallback image prevents UI breaks when image_url is empty.
  return `https://picsum.photos/seed/${product.id}/480/320`;
}

export function HomePage() {
  const { search, category, setSearch, setCategory } = useCatalogSearchParams();
  const env = getEnvConfig();

  const categoriesQuery = useCategoriesQuery();
  const productsQuery = useProductsQuery({
    searchText: search,
    categoryId: category,
  });

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistIds = useCartStore((state) => state.wishlistIds);

  const categories = categoriesQuery.data ?? [];
  const products = useMemo(
    () =>
      (productsQuery.data ?? []).map((item) => ({
        ...item,
        image_url: mapProductImage(item),
      })),
    [productsQuery.data]
  );

  return (
    <section className="home-page">
      <div className="home-page__hero container">
        <p className="eyebrow">100% Organic Vegetables</p>
        <h2>The best way to stuff your wallet.</h2>
        <p>Use search and category filters below. Their state is synced with URL search params.</p>
      </div>

      {!env.isConfigured && (
        <div className="container env-warning">
          <p>
            Environment variables are missing: <strong>{env.missingVars.join(', ')}</strong>
          </p>
          <p>Please set them in `.env.local` to load data from your backend.</p>
        </div>
      )}

      <div className="container promo-grid">
        {promoCards.map((card) => (
          <article key={card.id} className="promo-card">
            <h3>{card.title}</h3>
            <button type="button">{card.buttonLabel}</button>
          </article>
        ))}
      </div>

      <div className="container">
        <h2 className="section-title">Popular Products</h2>

        <CatalogFilters
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          searchValue={search}
          onSearchChange={setSearch}
        />

        {productsQuery.isLoading ? <p>Loading products...</p> : null}
        {productsQuery.isError ? (
          <p>Could not load products. Check backend tables/permissions and env values.</p>
        ) : null}

        <div className="products-grid">
          {products.map((product) => (
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

      <div className="container perks-grid">
        {perks.map((perk) => (
          <article key={perk.id} className="perk-card">
            <h4>{perk.title}</h4>
            <p>{perk.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
