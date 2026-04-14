export function CatalogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="catalog-filters">
      {/* Search field is synchronized with URL search params. */}
      <label className="catalog-filters__search">
        <span>Search</span>
        <input
          type="search"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="catalog-filters__category">
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
    </div>
  );
}
