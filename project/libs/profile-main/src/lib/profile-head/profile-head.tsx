import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { MaterialIcon, Modal } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface ProfileHeadProps {}

export function ProfileHead(props: ProfileHeadProps) {
  const { user } = useAuthRedux();
  console.log('user: ', user);

  return (
    <div className={styles.container}>
      <div className={styles.profile__img_wrapper}>
        <img
          src={user?.avatarPath}
          alt={'avatar'}
          className={styles.profile__img}
        />
      </div>
      <div
        className={styles.profile__info}
        onClick={() => console.log('модальное окно с информацией')}
      >
        <h2 className={styles.profile__user_fullname}>Иван Иванов</h2>
        {/*<span className={styles.profile__username}>@{user?.userName}</span>*/}
        <div className={styles.profile__infoIconsBox}>
          <div className={styles.profile__infoIconGroup}>
            <MaterialIcon
              name={'MdOutlineLocationOn'}
              className={styles.profile__infoIcon}
            />
            <span>Москва</span>
          </div>
          <div className={styles.profile__infoIconGroup}>
            <MaterialIcon
              name={'MdOutlineInfo'}
              className={styles.profile__infoIcon}
            />
            <span>О себе</span>
          </div>
        </div>
      </div>
      <button
        className={styles.profile__settingBtn}
        onClick={() => console.log('settings')}
      >
        <MaterialIcon
          name={'MdSettings'}
          className={styles.profile__settingBtn_icon}
        />
      </button>
      {/*<p className={styles.profile_load_img}>Загрузить аватар</p>*/}
    </div>
  );
}

export default ProfileHead;
