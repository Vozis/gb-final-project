import { INotification } from '@project/shared/types';
import { Link } from 'react-router-dom';
import { Avatar } from '@project/shared/ui';
import styles from './notification-friend.module.scss';

/* eslint-disable-next-line */
export interface NotificationFriendsProps {
  data: INotification;
}

export function NotificationFriend(data: NotificationFriendsProps) {
  // console.log('data: ', data);
  return (
    <>
      {data.data.type === 'FRIEND_ADD' ? (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <Avatar
            imagePath={data.data.user.avatarPath}
            className={styles.avatar}
          />
          <p>
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> добавил вас в друзья </span>
          </p>
        </div>
      ) : (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <Avatar
            imagePath={data.data.user.avatarPath}
            className={styles.avatar}
          />
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span> удалил вас из друзей &nbsp;</span>
          </p>
        </div>
      )}
    </>
  );
}

export default NotificationFriend;
