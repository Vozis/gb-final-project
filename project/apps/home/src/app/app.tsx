// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app/app.module.scss';

import { HomeMain } from '@project/home-main';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

import '../styles.scss';
export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <HomeMain />;
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
