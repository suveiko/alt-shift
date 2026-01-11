import { lazy } from 'react';

import ApplicationsPage from '@pages/applications';

import { RoutesPaths } from '@shared/routing';

import type { RouteObject } from 'react-router-dom';

const ApplicationGeneratorPage = lazy(
  () => import('@pages/application-generator'),
);

const ApplicationDetailPage = lazy(() => import('@pages/application-detail'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

export const routeConfig: RouteObject[] = [
  {
    path: RoutesPaths.home,
    element: <ApplicationsPage />,
  },
  {
    path: RoutesPaths.newApplication,
    element: <ApplicationGeneratorPage />,
  },
  {
    path: RoutesPaths.applicationDetail,
    element: <ApplicationDetailPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
