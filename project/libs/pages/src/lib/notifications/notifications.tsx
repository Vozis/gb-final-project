import styles from './notifications.module.scss';

/* eslint-disable-next-line */
export interface NotificationsProps {}

export function Notifications(props: NotificationsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Notifications!</h1>
    </div>
  );
}

export default Notifications;
