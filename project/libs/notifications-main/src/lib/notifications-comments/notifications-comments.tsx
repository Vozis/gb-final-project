import styles from './notifications-comments.module.scss';

/* eslint-disable-next-line */
export interface NotificationsCommentsProps {}

export function NotificationsComments(props: NotificationsCommentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NotificationsComments!</h1>
    </div>
  );
}

export default NotificationsComments;
