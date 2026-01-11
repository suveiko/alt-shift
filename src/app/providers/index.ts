import { LocalStorageProvider } from '@shared/lib';

import { AppRoutesProvider } from './app-routes-provider';
import { ErrorBoundaryProvider } from './error-boundary-provider';
import { QueryClientProvider } from './query-client-provider';

export const PROVIDERS = [
  ErrorBoundaryProvider,
  QueryClientProvider,
  LocalStorageProvider,
  AppRoutesProvider,
];
