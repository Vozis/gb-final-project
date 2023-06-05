// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../styles.scss';
import { AuthMain } from '@project/auth-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';

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
