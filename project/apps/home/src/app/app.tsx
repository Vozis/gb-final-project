// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { HomeMain } from '@project/home-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';

import '../styles.scss';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <HomeMain />
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
