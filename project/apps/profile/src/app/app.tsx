// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../styles.scss';

import { ProfileMain } from '@project/profile-main';
import { SharedLayout } from '@project/shared/layout';
import { SharedProviders } from '@project/shared/providers';
import '../styles.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '@project/shared/types';
import { useMutation } from '@tanstack/react-query';

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
