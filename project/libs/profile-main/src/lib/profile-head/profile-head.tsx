import { useAuthRedux } from '@project/shared/hooks';
import styles from './profile-head.module.scss';
/* eslint-disable-next-line */
export interface ProfileHeadProps {}

export function ProfileHead(props: ProfileHeadProps) {
  const { user } = useAuthRedux();
  console.log('user: ', user);

  return (
    <div className={styles.container}>
      <p>{user?.userName}</p>
      <img
        src={user?.avatarPath}
        alt={'avatar'}
        className={'w-42 h-42'}
        style={{
          borderRadius: '200px',
          width: '250px',
          height: '250px',
          backgroundSize: 'cover',
        }}
      />
      <p className={styles.profile_load_img}>Загрузить аватар</p>
      <div className={styles.profile_user_div}>
        <p className={styles.profile_user_name}>{user?.firstName}</p>
        {/* Здесь будет имя */}
        <p className={styles.profile_user_name}>{user?.lastName}</p>
        {/* Здесь будет фамилия */}
      </div>
    </div>
  );
}

export default ProfileHead;
