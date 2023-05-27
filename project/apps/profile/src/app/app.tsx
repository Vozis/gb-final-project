// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import List from './components/List';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

import '../styles.scss';
import { ProfileMain } from '@project/profile-main';

export function App() {
  return (
    <SharedLayout>
      <ProfileMain />;
    </SharedLayout>
  );
}

export default App;
