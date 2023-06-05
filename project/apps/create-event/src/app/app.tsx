// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import { CreateEventMain } from '@project/create-event-main';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <CreateEventMain />
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
