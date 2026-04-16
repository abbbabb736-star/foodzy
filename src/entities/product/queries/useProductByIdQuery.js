import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../services/productsApi';

export function useProductByIdQuery(productId) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
  });
}
