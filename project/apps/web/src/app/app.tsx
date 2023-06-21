// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { SharedLayout } from '@project/shared/layout';
import * as React from 'react';
import { SharedProviders } from '@project/shared/providers';
import {
  Home,
  Notifications,
  ResetPassword,
  Auth,
  ConfirmEmail,
  Hello,
  CreateEvent,
  SingleEvent,
  SingleUser,
  Profile,
} from '@project/pages';

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <React.Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/hello" element={<Hello />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events/:id" element={<SingleEvent />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<SingleUser />} />
          </Routes>
        </React.Suspense>
      </SharedLayout>
    </SharedProviders>
  );
}

export default App;
