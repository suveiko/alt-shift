import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@shared/api';

import type { ReactNode } from 'react';

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
};
