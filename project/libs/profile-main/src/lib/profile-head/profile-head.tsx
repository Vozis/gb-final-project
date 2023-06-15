import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';

import { useModal } from '@project/shared/hooks';
import { UserCardSmall, MaterialIcon, UserBig, Modal } from '@project/shared/ui';
import { useNavigate } from 'react-router-dom';
import * as events from 'events';
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

  return (
    <div className={styles.container}>
      <UserBig userProps={userProps} className={styles.profile__img_wrapper} />
      <button
        className={styles.profile__settingBtn}
 onClick={handleToggleModal}
      >
        {isProfile ? (
          <MaterialIcon
            name={'MdSettings'}
            className={styles.profile__settingBtn_icon}
          />
        </button>
        <Modal
          show={isShowModal}
          onCloseClick={handleToggleModal}
          className={styles.profile__modal}
        >
          <a href="#">Редактировать профиль</a>
        </Modal>
        ) : (
          <MaterialIcon
            name={'MdPersonAddAlt'}
            className={styles.profile__settingBtn_icon}
          />
        )}
      </button>

      {/*<p className={styles.profile_load_img}>Загрузить аватар</p>*/}
    </div>
  );
}

export default ProfileHead;
