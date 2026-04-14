import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../services/productsApi';

export function useProductsQuery({ searchText, categoryId }) {
  return useQuery({
    queryKey: ['products', { searchText, categoryId }],
    queryFn: () => getProducts({ searchText, categoryId }),
  });
}
