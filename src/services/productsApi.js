import { httpClient } from './httpClient';

// Keep table names centralized to avoid string duplication.
const PRODUCTS_TABLE = 'products';
const CATEGORIES_TABLE = 'categories';

export async function getCategories() {
  const response = await httpClient.get(`/${CATEGORIES_TABLE}`, {
    params: {
      select: 'id,name',
      order: 'name.asc',
    },
  });

  return response.data ?? [];
}

export async function getProducts({ searchText, categoryId, limit = 8 }) {
  const params = {
    select: 'id,title,description,image_url,price,old_price,rating,category_id',
    order: 'id.desc',
    limit,
  };

  if (searchText) {
    params.title = `ilike.*${searchText}*`;
  }

  if (categoryId && categoryId !== 'all') {
    params.category_id = `eq.${categoryId}`;
  }

  const response = await httpClient.get(`/${PRODUCTS_TABLE}`, { params });
  return response.data ?? [];
}
