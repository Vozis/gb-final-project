// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthMain } from '@project/auth-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';

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
