import {
  useActions,
  useAuthRedux,
  useCheckEventStatus,
  useNotificationState,
} from '@project/shared/hooks';
import { Badge, Button } from '@project/shared/ui';
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineBell,
} from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { toast } from 'react-toastify';
import isActive = toast.isActive;

/* eslint-disable-next-line */
export interface HeaderProps {}

const setActive = ({ isActive }: { isActive: any }) =>
  isActive ? 'active_link' : '';

export function Header(props: HeaderProps) {
  const { user } = useAuthRedux();
  const { finishedEvents } = useNotificationState();

  // console.log('menu', finishedEvents);
  // console.log(user?.events);

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
            <AiOutlineUser className={'text-[30px]'} />
            <span>Профиль</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.on_active_link
            }
          >
            <div>
              <Badge badgeContent={finishedEvents?.length}>
                <AiOutlineBell className={'text-[30px]'} />
              </Badge>

              {/*<div*/}
              {/*  className={`w-4 h-4 rounded-full bg-red-400  items-center justify-center absolute -top-0.5 -right-0.5 ${*/}
              {/*    !finishedEvents?.length ? 'hidden' : 'flex'*/}
              {/*  }`}*/}
              {/*>*/}
              {/*  <p className={'text-xs text-white'}>{finishedEvents?.length}</p>*/}
              {/*</div>*/}
            </div>
            <span>Уведомления</span>
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
