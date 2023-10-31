import styles from './settings-main.module.scss';

/* eslint-disable-next-line */
export interface SettingsMainProps {}

export function SettingsMain(props: SettingsMainProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SettingsMain!</h1>
    </div>
  );
}

export default SettingsMain;
