// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { SharedProviders } from '@project/shared/providers';

import '../styles.scss';
import { SharedLayout } from '@project/shared/layout';
export function App() {
  return (
    <SharedLayout>
      <NxWelcome title="settings" />;
    </SharedLayout>
  );
}

export default App;
