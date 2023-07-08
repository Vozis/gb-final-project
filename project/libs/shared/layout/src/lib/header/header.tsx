import {
  useActions,
  useAuthRedux,
  useModal,
  useNotificationState,
  useTheme,
} from '@project/shared/hooks';
import { Badge, Button, MaterialIcon, ThemeSwitcher } from '@project/shared/ui';
import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUser,
} from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import styles from './header.module.scss';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface HeaderProps {}

const setActive = ({ isActive }: { isActive: any }) =>
  isActive ? 'active_link' : '';

export function Header(props: HeaderProps) {
  const [isShowSettingModal, handleToggleSettingModal] = useModal(false); // new modal
  const headerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthRedux();
  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useActions();
  const { count } = useNotificationState();

  // const { finishedEvents } = useCheckEventStatus();
  // console.log('notifications: ', finishedEvents?.length);
  const modalHeight = useRef<HTMLDivElement>(null); // new modal
  const [height, setHeight] = useState('0px'); //new modal
  useEffect(() => {
    if (modalHeight.current) {
      setHeight(
        isShowSettingModal ? `${modalHeight.current.scrollHeight}px` : '0px',
      );
    }
  }, [isShowSettingModal]); //new modal
  useEffect(() => {
    if (headerRef.current) {
      const header = headerRef.current;
      let prevScroll: number = window.pageYOffset;
      let currentScroll = undefined;
      window.addEventListener('scroll', () => {
        currentScroll = window.pageYOffset;
        const headerHidden = () =>
          header.classList?.contains(styles.header_hidden);
        if (currentScroll > prevScroll && !headerHidden()) {
          header.classList.add(styles.header_hidden);
        }
        if (currentScroll < prevScroll && headerHidden()) {
          header.classList.remove(styles.header_hidden);
        }
        prevScroll = currentScroll;
      });
    }
  }, []);
  return (
    <header
      ref={headerRef}
      className={clsx(styles.header, {
        // [`${styles.header} ${styles.dark}`]: theme === 'dark',
        // [`${styles.header} ${styles.light}`]: theme === 'light',
      })}
    >
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
          {/* <button
            type="button"
            className={styles.profile__settingBtn}
            onClick={handleToggleSettingModal}
          >
            <Badge badgeContent={finishedEvents?.length}>
              <AiOutlineBell className={'text-[30px]'} />
            </Badge>
          </button>
          <ModalWindow
            isSettingModal
            show={isShowSettingModal}
            onCloseClick={handleToggleSettingModal}
            ref={modalHeight}
            height={height}
          >
            <ul className={styles.profile__settingsList}>
              <li>
                <Link to={'/'} className={styles.profile__settingsList_item}>
                  <MaterialIcon
                    name={'MdOutlineEdit'}
                    className={styles.profile__settingsList_item_icon}
                  />
                  <span>Редактировать профиль</span>
                </Link>
              </li>
              <li>
                <Link to={'/'} className={styles.profile__settingsList_item}>
                  <MaterialIcon
                    name={'MdArrowOutward'}
                    className={styles.profile__settingsList_item_icon}
                  />
                  <span>Поделиться профилем</span>
                </Link>
              </li>
            </ul>
          </ModalWindow> */}
          {/* меняем navlinck на ModalWindow */}
          {user && (
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
          )}
        </li>
      </ul>
      <div className={styles.header_btn_login}>
        {/* <span>{user?.userName}</span> */}
        {!user && (
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
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
