import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles.scss';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
