import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { SharedProviders } from '@project/shared/providers';
import { BrowserRouter } from 'react-router-dom';
import { SharedLayout } from '@project/shared/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <App />,
  // <StrictMode>
  //   <BrowserRouter>
  //
  //   </BrowserRouter>
  // </StrictMode>,
);
