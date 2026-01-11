import './shared/styles/global.css';

import ReactDOM from 'react-dom/client';

import { PROVIDERS } from '@app/providers';
import { ProviderComposer } from '@app/providers/ProviderComposer';

import { App } from './app/App';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ProviderComposer providers={PROVIDERS}>
    <App />
  </ProviderComposer>,
);
