import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { User } from '@prisma/client';
import { useActions, useAuthRedux } from '@project/shared/hooks';
import { Button } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { user } = useAuthRedux();

  const navigate = useNavigate();

  const { logout } = useActions();

  return (
    <header className={styles.header}>
      <ul className={'flex flex-wrap gap-4'}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/*<li>*/}
        {/*  <Link to="/auth">Auth</Link>*/}
        {/*</li>*/}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <div
        className={'border-l px-4 ml-5 flex items-center justify-between gap-4'}
      >
        <span>{user?.userName}</span>
        {user ? (
          <Button type={'button'} onClick={() => logout()}>
            Выйти
          </Button>
        ) : (
          <Button type={'button'} onClick={() => navigate('/auth')}>
            Войти
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
