import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@shared/ui';

import type { PropsWithChildren } from 'react';

export const AppRoutesProvider = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </BrowserRouter>
  );
};
