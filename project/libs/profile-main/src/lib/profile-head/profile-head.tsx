import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Link } from 'react-router-dom';
import { useModal } from '@project/shared/hooks';
import { MaterialIcon, UserBig, Modal } from '@project/shared/ui';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@project/shared/types';

/* eslint-disable-next-line */
export interface ProfileHeadProps {
  userProps: IUser;
}

export function ProfileHead({ userProps }: ProfileHeadProps) {
  const { user } = useAuthRedux();
  const [isShowModal, handleToggleModal] = useModal(false);

  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }
  // console.log('user: ', user);

  const isProfile = userProps.id === user?.id;
  console.log('modalState', isShowModal);
  return (
    <div className={styles.container}>
      <UserBig userProps={userProps} className={styles.profile__img_wrapper} />

      {isProfile ? (
        <>
          <button
            className={styles.profile__settingBtn}
            onClick={handleToggleModal}
          >
            <MaterialIcon
              name={'MdSettings'}
              className={styles.profile__settingBtn_icon}
            />
          </button>
          <Modal
            show={isShowModal}
            onCloseClick={handleToggleModal}
            isProfileModal
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
            </ul>
          </Modal>
        </>
      ) : (
        <button
          className={styles.profile__settingBtn}
          onClick={handleToggleModal}
        >
          <MaterialIcon
            name={'MdPersonAddAlt'}
            className={styles.profile__settingBtn_icon}
          />
        </button>
      )}

      {/*<p className={styles.profile_load_img}>Загрузить аватар</p>*/}
    </div>
  );
}

export default ProfileHead;
