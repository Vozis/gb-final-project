import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Avatar, MaterialIcon } from '@project/shared/ui';
import { login } from '../../../../shared/store/src/lib/actions/userActions';
import * as events from 'events';

/* eslint-disable-next-line */
export interface ProfileHeadProps {}

export function ProfileHead(props: ProfileHeadProps) {
  const { user } = useAuthRedux();
  console.log('user: ', user);

  return (
    <div className={styles.container}>
      <Avatar
        avatarUrl={user?.avatarPath}
        alt={'avatar'}
        className={styles.profile__img_wrapper}
      />
      <div
        className={styles.profile__info}
        onClick={() => console.log('модальное окно с информацией')}
      >
        <h2
          className={styles.profile__user_fullname}
        >{`${user?.firstName} ${user?.lastName}`}</h2>
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
