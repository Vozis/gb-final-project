// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SharedLayout } from '@project/shared/layout';

import { ProfileForm, ProfileHead } from '@project/profile-main';
import '../styles.scss';

export function App() {
  return (
    <SharedLayout>
      <ProfileHead />
      <ProfileForm />
    </SharedLayout>
  );
}

export default App;
