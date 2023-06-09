import '../styles.scss';
import * as React from 'react';

import { Link, Route, Routes, createBrowserRouter } from 'react-router-dom';

import { SharedProviders } from '@project/shared/providers';

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
      <React.Suspense fallback={null}>
        {/*<ul>*/}
        {/*  <li>*/}
        {/*    <Link to="/">Home</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link to="/auth">Auth</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link to="/profile">Profile</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link to="/settings">Settings</Link>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<SingleEvent />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </React.Suspense>
    </SharedProviders>
  );
}

export default App;
