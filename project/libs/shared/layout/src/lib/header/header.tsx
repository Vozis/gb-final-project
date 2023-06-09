import { useActions, useAuthRedux } from '@project/shared/hooks';
import { Button } from '@project/shared/ui';
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
            <IconContext.Provider value={{ color: 'inherit', size: '30px' }}>
              <div>
                <AiOutlineHome />
              </div>
            </IconContext.Provider>
            <p>Главная</p>
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
            <IconContext.Provider value={{ color: 'inherit', size: '30px' }}>
              <div>
                <AiOutlineProfile />
              </div>
            </IconContext.Provider>
            <p>Профиль</p>
          </NavLink>
        </li>
      </ul>
      <div className={styles.header_btn_login}>
        {/* <span>{user?.userName}</span> */}
        {user ? (
          <Button
            className={styles.active_link}
            type={'button'}
            onClick={() => logout()}
          >
            Выйти
          </Button>
        ) : (
          // <Button type={'button'} onClick={() => navigate('/auth')}>
          //   Войти
          // </Button>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.on_active_link
            }
          >
            <IconContext.Provider value={{ color: 'inherit', size: '30px' }}>
              <div>
                <AiOutlineLogin />
              </div>
            </IconContext.Provider>
            <p>Войти</p>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
