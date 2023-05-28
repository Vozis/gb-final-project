import ProfileForm from './profile-form/profile-form';
import ProfileHead from './profile-head/profile-head';
import styles from './profile-main.module.scss';
/* eslint-disable-next-line */
export interface ProfileMainProps {}

export function ProfileMain(props: ProfileMainProps) {
  return (
    <div className={styles['container']}>
      {/* <h1>Welcome to ProfileHobbies!</h1> */}
      <ProfileHead />
      <ProfileForm />
    </div>
  );
}
export default ProfileMain;
