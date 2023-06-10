import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
import { Avatar, MaterialIcon } from '@project/shared/ui';
import { login } from '../../../../shared/store/src/lib/actions/userActions';
import * as events from 'events';

/* eslint-disable-next-line */
export interface ProfileHeadProps {}

export function ProfileHead(props: ProfileHeadProps) {
  const { user } = useAuthRedux();

  if (!user) return null;
  console.log('user: ', user);

  return (
    <div className={styles.container}>
      <Avatar
        user={user}
        className={styles.profile__img_wrapper}
        isName
        isInfo
        isPhoto
      />
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
