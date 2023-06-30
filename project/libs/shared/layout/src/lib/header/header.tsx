import {
  useActions,
  useAuthRedux,
  useNotificationState,
} from '@project/shared/hooks';
import { Badge, Button, MaterialIcon } from '@project/shared/ui';
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineBell,
} from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { toast } from 'react-toastify';
import isActive = toast.isActive;
import { getFinishedEvents } from '../../../../store/src/lib/actions/notificationActions';
import { NotificationService } from '@project/shared/services';

/* eslint-disable-next-line */
export interface HeaderProps {}

const setActive = ({ isActive }: { isActive: any }) =>
  isActive ? 'active_link' : '';

export function Header(props: HeaderProps) {
  const { user } = useAuthRedux();
  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useActions();
  const { count } = useNotificationState();
  // const { finishedEvents } = useCheckEventStatus();
  // console.log('notifications: ', finishedEvents?.length);
  return (
    <header className={styles.header}>
      <ul className={'flex flex-wrap gap-3 items-center'}>
        <li>
          {location.pathname !== '/' && (
            <Button onClick={() => navigate(-1)}>
              <MaterialIcon
                name={'MdOutlineArrowBack'}
                className={'text-3xl'}
              />
            </Button>
          )}
        </li>
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
              <Badge badgeContent={count}>
                <AiOutlineBell className={'text-[30px]'} />
              </Badge>
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
