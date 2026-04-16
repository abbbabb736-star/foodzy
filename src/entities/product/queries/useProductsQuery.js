import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../services/productsApi';

export function useProductsQuery({ searchText, categoryId, limit, enabled = true }) {
  return useQuery({
    queryKey: ['products', { searchText, categoryId, limit }],
    queryFn: () => getProducts({ searchText, categoryId, limit }),
    enabled,
  });
}
