import '../styles.scss';
import * as React from 'react';

import { Link, Route, Routes, createBrowserRouter } from 'react-router-dom';

import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';
import { TailSpin } from 'react-loader-spinner';
import { useActions, useFilterState } from '@project/shared/hooks';
import { useFilter } from '../../../../libs/shared/ui/src/lib/filter/useFilter';

const SingleUser = React.lazy(() => import('single-user/Module'));

const ResetPassword = React.lazy(() => import('reset-password/Module'));

const ConfirmEmail = React.lazy(() => import('confirm-email/Module'));

const Hello = React.lazy(() => import('hello/Module'));

const CreateEvent = React.lazy(() => import('create-event/Module'));

const SingleEvent = React.lazy(() => import('single-event/Module'));

const Auth = React.lazy(() => import('auth/Module'));

const Profile = React.lazy(() => import('profile/Module'));

const Home = React.lazy(() => import('home/Module'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
// ]);

export function App() {
  return (
    <SharedProviders>
      <SharedLayout>
        <React.Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
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
