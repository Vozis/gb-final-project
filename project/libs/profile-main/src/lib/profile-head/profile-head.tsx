import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Link } from 'react-router-dom';
import { useModal } from '@project/shared/hooks';
import { MaterialIcon, UserBig, ModalWindow } from '@project/shared/ui';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@project/shared/types';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface ProfileHeadProps {
  userProps: IUser;
}

export function ProfileHead({ userProps }: ProfileHeadProps) {
  const { user } = useAuthRedux();
  const [isShowSettingModal, handleToggleSettingModal] = useModal(false);
  const [isShowUserInfoModal, handleToggleUserInfoModal] = useModal(false);
  const modalHeight = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  const navigate = useNavigate();

  useEffect(() => {
    if (modalHeight.current) {
      setHeight(
        isShowSettingModal ? `${modalHeight.current.scrollHeight}px` : '0px',
      );
    }
  }, [isShowSettingModal]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  // console.log('user: ', user);
  // console.log('isShowUserInfoModal: ', isShowUserInfoModal);

  const isProfile = userProps.id === user?.id;
  // console.log('isShowSettingModal', isShowSettingModal);
  return (
    <div className={styles.container}>
      <UserBig
        userProps={userProps}
        className={styles.profile__img_wrapper}
        onClick={handleToggleUserInfoModal}
      />

      {isProfile ? (
        <>
          <button
            type="button"
            className={styles.profile__settingBtn}
            onClick={handleToggleSettingModal}
          >
            <span className={styles.visuallyHidden}>настройки профиля</span>
            <MaterialIcon
              name={'MdSettings'}
              className={styles.profile__settingBtn_icon}
            />
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
          </ModalWindow>
          <ModalWindow
            isUserInfoModal
            show={isShowUserInfoModal}
            onCloseClick={handleToggleUserInfoModal}
            isBtnClose
          >
            <div className={styles.profile__modalInfo_header + ' font-medium'}>
              Подробная информация
            </div>
            <div className={styles.profile__modalInfo_inner}>
              <section>
                <div className={styles.profile__modalInfo_innerBox}>
                  <MaterialIcon
                    name={'MdAlternateEmail'}
                    className={styles.profile__modalInfo_icon}
                  />
                  <span>{userProps.userName}</span>
                </div>
              </section>
              <section>
                <p className={'font-medium mb-2'}>Предпочтения</p>
                <div className={'flex flex-wrap space-x-1'}>
                  {userProps.hobbies?.map(item => (
                    <div
                      className={'rounded-xl mb-1 bg-cyan-300 px-1.5'}
                      key={item.id}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </ModalWindow>
        </>
      ) : (
        <button
          className={styles.profile__settingBtn}
          onClick={handleToggleSettingModal}
        >
          <MaterialIcon
            name={'MdPersonAddAlt'}
            className={styles.profile__settingBtn_icon}
          />
        </button>
      )}
    </div>
  );
}

export default ProfileHead;
