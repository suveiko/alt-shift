import { useRoutes } from 'react-router-dom';

import { Header } from '@widgets/header';

import { Container } from '@shared/ui';

import { routeConfig } from './providers/app-routes-provider';

export const App = () => {
  const routes = useRoutes(routeConfig);

  return (
    <Container>
      <Header />

      <main>{routes}</main>
    </Container>
  );
};
