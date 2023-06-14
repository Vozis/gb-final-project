import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Avatar, MaterialIcon, Modal } from '@project/shared/ui';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface ProfileHeadProps {}

export function ProfileHead(props: ProfileHeadProps) {
  const { user } = useAuthRedux();
  const [isShowModal, handleToggleModal] = useModal(false);

  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }
  // console.log('user: ', user);
  return (
    <div className={styles.container}>
      <Avatar
        user={user}
        className={styles.profile__img_wrapper}
        isName
        isInfo
        isPhoto
      />
      <div>
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
          className={styles.profile__modal}
        >
          <a href="#">Редактировать профиль</a>
        </Modal>
      </div>

      {/*<p className={styles.profile_load_img}>Загрузить аватар</p>*/}
    </div>
  );
}

export default ProfileHead;
