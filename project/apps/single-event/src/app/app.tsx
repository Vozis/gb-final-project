// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

import { SingleEventMain } from '@project/single-event-main';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <SingleEventMain />
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
