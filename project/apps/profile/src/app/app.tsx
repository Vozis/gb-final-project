// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import List from './components/List';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

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
