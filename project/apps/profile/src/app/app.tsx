// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import List from './components/List';

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
