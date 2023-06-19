// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

export function App() {
  return (
    <div>
      <NxWelcome title="notifications" />
    </div>
  );
}

export default App;
