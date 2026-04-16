import { useEffect, useMemo, useRef, useState } from 'react';
import { CatalogFilters } from '../features/catalog/ui/CatalogFilters';
import { useCategoriesQuery } from '../entities/category/queries/useCategoriesQuery';
import { useProductsQuery } from '../entities/product/queries/useProductsQuery';
import { useCatalogSearchParams } from '../shared/hooks/useCatalogSearchParams';
import { useMinLoading } from '../shared/hooks/useMinLoading';
import { ProductCardSkeleton } from '../entities/product/ui/ProductCardSkeleton';
import { ProductCard } from '../entities/product/ui/ProductCard';
import { useCartStore } from '../store/useCartStore';

function withFallbackImage(product) {
  return {
    ...product,
    image_url: product.image_url || `https://picsum.photos/seed/catalog-${product.id}/480/320`,
  };
}

export function CatalogPage() {
  const { search, category, setSearch, setCategory } = useCatalogSearchParams();
  const [sort, setSort] = useState('featured');
  const [minPrice] = useState('0');
  const [maxPriceDraft, setMaxPriceDraft] = useState('300');
  const [maxPriceApplied, setMaxPriceApplied] = useState('300');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const gridRef = useRef(null);
  const PAGE_SIZE = 12;
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const categoriesQuery = useCategoriesQuery();
  const productsQuery = useProductsQuery({
    searchText: search,
    categoryId: category,
    limit: 40,
  });

  const products = useMemo(() => {
    const base = (productsQuery.data ?? []).map(withFallbackImage);

    const numericMin = minPrice ? Number(minPrice) : null;
    const numericMax = maxPriceApplied ? Number(maxPriceApplied) : null;

    let filtered = base.filter((item) => {
      const price = Number(item.price ?? 0);
      if (numericMin !== null && price < numericMin) return false;
      if (numericMax !== null && price > numericMax) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
        break;
      case 'rating-desc':
        filtered = [...filtered].sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => Number(b.id ?? 0) - Number(a.id ?? 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [productsQuery.data, minPrice, maxPriceApplied, sort]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  const skeletons = Array.from({ length: PAGE_SIZE }, (_, index) => `catalog-skeleton-${index}`);
  const showLoading = useMinLoading(productsQuery.isLoading, 1200);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(1);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search, category, sort, minPrice, maxPriceApplied]);

  useEffect(() => {
    if (productsQuery.isLoading) return;

    const startId = window.setTimeout(() => {
      setPageLoading(true);
    }, 0);

    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const stopId = window.setTimeout(() => {
      setPageLoading(false);
    }, 260);

    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(stopId);
    };
  }, [currentPage, productsQuery.isLoading]);

  function handlePageChange(nextPage) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;
    setPage(nextPage);
  }

  return (
    <section className="container page-section">
      <h2 className="section-title">Shop</h2>
      <CatalogFilters
        categories={categoriesQuery.data ?? []}
        selectedCategory={category}
        onCategoryChange={setCategory}
        searchValue={search}
        onSearchChange={setSearch}
        minPrice={minPrice}
        maxPrice={maxPriceDraft}
        onMaxPriceChange={setMaxPriceDraft}
        onApplyPrice={() => setMaxPriceApplied(maxPriceDraft)}
        sortValue={sort}
        onSortChange={setSort}
        totalCount={products.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      >
        {productsQuery.isError ? <p>Could not load catalog products.</p> : null}

        <div
          ref={gridRef}
          className={`catalog-grid${viewMode === 'list' ? ' catalog-grid--list' : ''}`}
        >
          {showLoading || pageLoading
            ? skeletons.map((key) => <ProductCardSkeleton key={key} />)
            : visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWished={wishlistIds.includes(product.id)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
        </div>

        {!productsQuery.isLoading && products.length > 0 ? (
          <nav className="catalog-pagination" aria-label="Products pagination">
            <button
              type="button"
              className="catalog-page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={`catalog-page-btn${
                    pageNumber === currentPage ? ' catalog-page-btn--active' : ''
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              type="button"
              className="catalog-page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        ) : null}
      </CatalogFilters>
    </section>
  );
}
