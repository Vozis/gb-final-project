import { INotification } from '@project/shared/types';
import { Link } from 'react-router-dom';
import Avatar from '../../../../shared/ui/src/lib/avatar/avatar';
import styles from './notifications-friends.module.scss';

/* eslint-disable-next-line */
export interface NotificationsFriendsProps {
  data: INotification;
}

export function NotificationsFriends(data: NotificationsFriendsProps) {
  // console.log('data: ', data);
  return (
    <div className={styles.notifications} key={data.data.id}>
      {data.data.type === 'FRIEND_ADD' ? (
        <div className={styles.event_container}>
          {/* <img src={data.data.user.avatarPath} alt={'avatar'} /> */}

          <Avatar
            imagePath={data.data.user.avatarPath}
            className={styles.event_container_avatar}
          />
          <p>
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> добавил вас в друзья </span>
          </p>
        </div>
      ) : (
        <div className={styles.event_container}>
          <Avatar
            imagePath={data.data.user.avatarPath}
            className={styles.event_container_avatar}
          />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span> удалил вас из друзей &nbsp;</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default NotificationsFriends;
