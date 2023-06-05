// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ProfileMain } from '@project/profile-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import '../styles.scss';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <ProfileMain />
        {/* <ProfileHead /> */}
        {/* <ProfileForm /> */}
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
