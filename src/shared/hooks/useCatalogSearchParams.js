import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const defaults = {
  search: '',
  category: 'all',
};

export function useCatalogSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = useMemo(
    () => ({
      search: searchParams.get('search') ?? defaults.search,
      category: searchParams.get('category') ?? defaults.category,
    }),
    [searchParams]
  );

  function updateParam(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === defaults[key]) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams, { replace: true });
  }

  return {
    ...values,
    setSearch(value) {
      updateParam('search', value);
    },
    setCategory(value) {
      updateParam('category', value);
    },
  };
}
