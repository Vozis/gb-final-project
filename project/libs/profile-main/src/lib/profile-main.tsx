import styles from './profile-main.module.scss';

/* eslint-disable-next-line */
export interface ProfileMainProps {}

export function ProfileMain(props: ProfileMainProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProfileMain!</h1>
    </div>
  );
}

export default ProfileMain;
