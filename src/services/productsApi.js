const DUMMY_PRODUCTS_BASE_URL = 'https://dummyjson.com/products';

function mapDummyProduct(product) {
  const discount = Number(product.discountPercentage ?? 0);
  const price = Number(product.price ?? 0);
  const oldPrice = discount > 0 ? price / (1 - discount / 100) : null;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    image_url: product.thumbnail || product.images?.[0] || '',
    price,
    old_price: oldPrice ? Number(oldPrice.toFixed(2)) : null,
    rating: Number(product.rating ?? 0),
    category_id: product.category,
    category_name: product.category,
    brand: product.brand ?? '',
    sku: product.sku ?? '',
    stock: product.stock ?? null,
    weight: product.weight ?? null,
  };
}

export async function getCategories() {
  const response = await fetch(`${DUMMY_PRODUCTS_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Failed to load categories: ${response.status}`);
  }

  const categories = await response.json();

  return (categories ?? [])
    .map((item) => {
      if (typeof item === 'string') {
        return {
          id: item,
          name: item,
        };
      }

      if (item && typeof item === 'object') {
        const id = item.slug ?? item.name ?? '';
        const name = item.name ?? item.slug ?? '';

        if (!id || !name) {
          return null;
        }

        return { id, name };
      }

      return null;
    })
    .filter(Boolean);
}

export async function getProducts({ searchText, categoryId, limit = 8 }) {
  const hasSearch = Boolean(searchText?.trim());
  const hasCategory = Boolean(categoryId && categoryId !== 'all');
  const normalizedSearch = searchText?.trim() ?? '';

  let endpoint = `${DUMMY_PRODUCTS_BASE_URL}?limit=${limit}`;
  if (hasSearch) {
    endpoint = `${DUMMY_PRODUCTS_BASE_URL}/search?q=${encodeURIComponent(normalizedSearch)}&limit=${limit}`;
  } else if (hasCategory) {
    endpoint = `${DUMMY_PRODUCTS_BASE_URL}/category/${encodeURIComponent(categoryId)}?limit=${limit}`;
  }

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  const payload = await response.json();
  let products = payload.products ?? [];

  // DummyJSON does not combine category + search in one endpoint.
  if (hasCategory && hasSearch) {
    products = products.filter((item) => item.category === categoryId);
  }

  return products.map(mapDummyProduct);
}

export async function getProductById(productId) {
  const response = await fetch(`${DUMMY_PRODUCTS_BASE_URL}/${productId}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to load product: ${response.status}`);
  }

  const product = await response.json();
  return mapDummyProduct(product);
}
