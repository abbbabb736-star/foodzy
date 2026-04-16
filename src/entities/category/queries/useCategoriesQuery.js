import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../services/productsApi';

export function useCategoriesQuery(enabled = true) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled,
  });
}
