import styles from './notifications-friends.module.scss';

/* eslint-disable-next-line */
export interface NotificationsFriendsProps {}

export function NotificationsFriends(props: NotificationsFriendsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NotificationsFriends!</h1>
    </div>
  );
}

export default NotificationsFriends;
