// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import List from './components/List';

import '../styles.scss';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <List />
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
