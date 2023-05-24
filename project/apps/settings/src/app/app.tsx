// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { SharedProviders } from '@project/shared/providers';

import '../styles.scss';
export function App() {
  return (
    <div>
      <NxWelcome title="settings" />
    </div>
  );
}

export default App;
