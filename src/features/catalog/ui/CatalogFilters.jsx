export function CatalogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
  minPrice,
  maxPrice,
  onMaxPriceChange,
  onApplyPrice,
  sortValue,
  onSortChange,
  totalCount,
  viewMode,
  onViewModeChange,
  children,
}) {
  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <h3 className="catalog-sidebar__title">Product Category</h3>

        <label className="catalog-filters__group">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search for products..."
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="catalog-filters__group">
          <span>Category</span>
          <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="catalog-filters__group">
          <span>Filter By Price</span>
          <p className="catalog-filters__price-label">
            Price : <strong>${minPrice || 0}</strong> –{' '}
            <strong>${maxPrice || 300}</strong>
          </p>
          <div className="catalog-filters__price-row">
            <input
              type="range"
              min="0"
              max="300"
              step="10"
              value={maxPrice || 300}
              onChange={(event) => onMaxPriceChange(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="catalog-filters__apply"
            onClick={onApplyPrice}
          >
            Filter
          </button>
        </div>

        <div className="catalog-filters__group catalog-filters__group--static">
          <span>Weight</span>
          <div className="catalog-filters__options">
            <label>
              <input type="checkbox" readOnly /> 1kg Pack
            </label>
            <label>
              <input type="checkbox" readOnly /> 500g Pack
            </label>
            <label>
              <input type="checkbox" readOnly /> 250g Pack
            </label>
          </div>
        </div>

        <div className="catalog-filters__group catalog-filters__group--static">
          <span>Product Tags</span>
          <div className="catalog-filters__tags">
            <button type="button">Vegetables</button>
            <button type="button">Juice</button>
            <button type="button">Food</button>
            <button type="button">Dry Fruits</button>
          </div>
        </div>
      </aside>

      <div className="catalog-main">
        <header className="catalog-toolbar">
          <div className="catalog-toolbar__info">
            <div className="catalog-toolbar__view">
              <button
                type="button"
                className={viewMode === 'grid' ? 'is-active' : ''}
                aria-label="Grid view"
                onClick={() => onViewModeChange('grid')}
              >
                ▤
              </button>
              <button
                type="button"
                className={viewMode === 'list' ? 'is-active' : ''}
                aria-label="List view"
                onClick={() => onViewModeChange('list')}
              >
                ☰
              </button>
            </div>
            <span className="catalog-toolbar__label">Shop</span>
            <span className="catalog-toolbar__count">
              We found {totalCount} item{totalCount === 1 ? '' : 's'} for you!
            </span>
          </div>
          <label className="catalog-toolbar__sort">
            <span>Sort By:</span>
            <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </label>
        </header>

        {children}
      </div>
    </div>
  );
}
