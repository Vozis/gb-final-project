import styles from './header.module.scss';
import { IUser } from '@project/shared/types';
import { Link } from 'react-router-dom';
import * as React from 'react';

/* eslint-disable-next-line */
export interface HeaderProps {
  user: IUser;
}

export function Header(props: HeaderProps) {
  return (
    <header className={'bg-red-500 flex justify-center items-center py-5'}>
      <ul className={'flex flex-wrap gap-4'}>
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
    </header>
  );
}

export default Header;
