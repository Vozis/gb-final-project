// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { AuthMain } from '@project/auth-main';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

import '../styles.scss';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <AuthMain />
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
