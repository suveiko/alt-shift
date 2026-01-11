import { ErrorBoundary } from '@shared/ui';

import type { PropsWithChildren } from 'react';

export const ErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
