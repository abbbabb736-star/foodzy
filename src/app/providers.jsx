import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { DocumentEffects } from './DocumentEffects';

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DocumentEffects />
      {children}
    </QueryClientProvider>
  );
}
