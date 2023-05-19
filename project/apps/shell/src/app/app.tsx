import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import { SharedProviders } from '@project/shared/providers';

import '../styles.scss';

const Auth = React.lazy(() => import('auth/Module'));

const Profile = React.lazy(() => import('profile/Module'));

const Settings = React.lazy(() => import('settings/Module'));

const Home = React.lazy(() => import('home/Module'));

export function App() {
  return (
    <SharedProviders>
      <React.Suspense fallback={null}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </React.Suspense>
    </SharedProviders>
  );
}

export default App;
