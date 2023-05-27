import styles from './profile-settings.module.scss';

/* eslint-disable-next-line */
export interface ProfileSettingsProps {}

export function ProfileSettings(props: ProfileSettingsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProfileSettings!</h1>
    </div>
  );
}

export default ProfileSettings;
