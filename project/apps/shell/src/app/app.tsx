import '../styles.scss';
import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { SharedProviders } from '@project/shared/providers';
import { SharedLayout } from '@project/shared/layout';

// eslint-disable-next-line @nx/enforce-module-boundaries
const Notifications = React.lazy(() => import('../../../notifications/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const SingleUser = React.lazy(() => import('../../../single-user/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const ResetPassword = React.lazy(() => import('../../../reset-password/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const ConfirmEmail = React.lazy(() => import('../../../confirm-email/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const Hello = React.lazy(() => import('../../../hello/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const CreateEvent = React.lazy(() => import('../../../create-event/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const SingleEvent = React.lazy(() => import('../../../single-event/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const Auth = React.lazy(() => import('../../../auth/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const Profile = React.lazy(() => import('../../../profile/src/app/app'));
// eslint-disable-next-line @nx/enforce-module-boundaries
const Home = React.lazy(() => import('../../../home/src/app/app'));

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
