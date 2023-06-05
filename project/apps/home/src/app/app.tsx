// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../styles.scss';
import { HomeMain } from '@project/home-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';

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
