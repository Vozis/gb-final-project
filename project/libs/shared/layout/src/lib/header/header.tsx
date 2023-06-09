import { useActions, useAuthRedux } from '@project/shared/hooks';
import { BiIcon, Button, MaterialIcon } from '@project/shared/ui';
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineProfile,
} from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';

/* eslint-disable-next-line */
export interface HeaderProps {}

const setActive = ({ isActive }: { isActive: any }) =>
  isActive ? 'active_link' : '';

export function Header(props: HeaderProps) {
  const { user } = useAuthRedux();

  const navigate = useNavigate();

  const { logout } = useActions();

  return (
    <header className={styles.header}>
      <ul className={'flex flex-wrap gap-5'}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.on_active_link
            }
          >
            <AiOutlineHome className={'text-[30px]'} />
            <span>Главная</span>
          </NavLink>
        </li>
        {/*<li>*/}
        {/*  <Link to="/auth">Auth</Link>*/}
        {/*</li>*/}
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.on_active_link
            }
          >
            <AiOutlineProfile className={'text-[30px]'} />
            <span>Профиль</span>
          </NavLink>
        </li>
      </ul>
      <div className={styles.header_btn_login}>
        {/* <span>{user?.userName}</span> */}
        {user ? (
          <Button
            // className={styles.active_link}
            className={'underline'}
            type={'button'}
            onClick={() => logout()}
          >
            Выйти
          </Button>
        ) : (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.on_active_link
            }
          >
            <AiOutlineLogin className={'text-[30px]'} />
            <span>Войти</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
