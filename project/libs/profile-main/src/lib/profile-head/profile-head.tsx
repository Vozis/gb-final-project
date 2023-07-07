import {
  useActions,
  useAuthRedux,
  useModal,
  useTheme,
} from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  MaterialIcon,
  ModalAnchor,
  ModalScreen,
  UserBig,
} from '@project/shared/ui';
import { IToggle, IUser } from '@project/shared/types';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';
// import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface ProfileHeadProps {
  userProps: IUser;
}

export function ProfileHead({ userProps }: ProfileHeadProps) {
  const { user } = useAuthRedux();
  const {
    getProfile,
    logout,
    resetFilterState,
    resetNotificationState,
    resetCommentsState,
    resetSocketState,
  } = useActions();
  const [isShowSettingModal, handleToggleSettingModal] = useModal(false);
  const [isShowUserInfoModal, handleToggleUserInfoModal] = useModal(false);
  const modalHeight = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState('0px');
  const [top, setTop] = useState('0px');
  const [right, setRight] = useState('0px');
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user && user.friends?.some(user => user.id === userProps.id)) {
      setIsFriend(true);
    }
  }, [user]);

  const { theme } = useTheme();

  useEffect(() => {
    if (anchorRef.current) {
      // console.log(window.innerHeight, window.innerWidth);
      // console.log('anchor params: ', anchorRef.current.getBoundingClientRect());
    }
    if (modalHeight.current && anchorRef.current) {
      const screenWidth = window.innerWidth;
      const anchorParams = anchorRef.current.getBoundingClientRect();
      setHeight(
        isShowSettingModal ? `${modalHeight.current.scrollHeight}px` : '0px',
      );
      setTop(
        isShowSettingModal
          ? `${anchorParams.y + anchorParams.height + 20}px`
          : '0px',
      );
      setRight(
        isShowSettingModal ? `${screenWidth - anchorParams.right}px` : '0px',
      );
    }
  }, [isShowSettingModal]);

  const { mutateAsync, isLoading } = useMutation(
    ['toggle-friend-event'],
    (data: IToggle) => UserService.toggleFriend(data),
    {
      onError: error => {
        toast.error(errorCatch(error), {
          id: 'toggle-friend-error',
        });
      },
      onSuccess: async () => {
        getProfile();
        await queryClient.invalidateQueries(['get-single-user']);
        // toast.success('Статус друга успешно изменен', {
        //   toastId: 'toggle-friend-success',
        //   containerId: 1,
        // });
      },
    },
  );

  // useEffect(() => {
  //   if (user && user.friends?.some(user => user.id === userProps.id)) {
  //     setIsFriend(!isFriend);
  //   }
  // }, [getProfile, mutateAsync]);

  // console.log('isFriend: ', isFriend);

  const handleClickAddUser = async () => {
    const data: IToggle = {
      toggleId: userProps.id,
      type: 'friends',
    };

    await mutateAsync(data);
    setIsFriend(!isFriend);
  };

  // if (!user) {
  //   navigate('/auth');
  //   return null;
  // }

  // console.log('isShowUserInfoModal: ', isShowUserInfoModal);

  // console.log('isFriend: ', isFriend);

  const isProfile = userProps.id === user?.id;

  const handleLogout = () => {
    navigate('/auth');
    resetFilterState();
    resetNotificationState();
    resetCommentsState();
    resetSocketState();
    logout();
  };

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
            ref={anchorRef}
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
          <ModalAnchor
            show={isShowSettingModal}
            onCloseClick={handleToggleSettingModal}
            ref={modalHeight}
            height={height}
            top={top}
            right={right}
          >
            <Link
              to={'/profile/update'}
              className={styles.profile__settingsList_item}
            >
              <MaterialIcon
                name={'MdOutlineEdit'}
                className={styles.profile__settingsList_item_icon}
              />
              <span>Редактировать профиль</span>
            </Link>

            <Link to={'/'} className={styles.profile__settingsList_item}>
              <MaterialIcon
                name={'MdArrowOutward'}
                className={styles.profile__settingsList_item_icon}
              />
              <span>Поделиться профилем</span>
            </Link>
            <Button
              className={'underline'}
              type={'button'}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </ModalAnchor>

          <ModalScreen
            show={isShowUserInfoModal}
            onCloseClick={handleToggleUserInfoModal}
            isBtnClose
            title={'Подробная информация'}
          >
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
          </ModalScreen>
        </>
      ) : (
        user && (
          <button
            className={styles.profile__settingBtn}
            onClick={handleClickAddUser}
            disabled={isLoading}
          >
            {isLoading ? (
              <MaterialIcon
                name={'MdAccessTime'}
                className={styles.profile__settingBtn_icon}
              />
            ) : (
              <>
                {isFriend ? (
                  <MaterialIcon
                    name={'MdOutlinePersonAddDisabled'}
                    className={styles.profile__settingBtn_icon}
                  />
                ) : (
                  <MaterialIcon
                    name={'MdPersonAddAlt'}
                    className={styles.profile__settingBtn_icon}
                  />
                )}
              </>
            )}
          </button>
        )
      )}
    </div>
  );
}

export default ProfileHead;
