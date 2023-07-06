import { INotification } from '@project/shared/types';
import { Link } from 'react-router-dom';
import Avatar from '../../../../shared/ui/src/lib/avatar/avatar';
import styles from './notifications-events.module.scss';
/* eslint-disable-next-line */
export interface NotificationsEventsProps {
  data: INotification;
}

export function NotificationsEvents(data: NotificationsEventsProps) {
  // console.log('data: ', data.data);
  return (
    <div className={styles.notifications} key={data.data.id}>
      {data.data.type === 'EVENT_PARTICIPATE' ? (
        <div className={styles.event_container}>
          <Avatar imagePath={data.data.user.avatarPath} />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> присоединился к событию </span>
            <Link
              to={`/events/${data.data.sourceId}`}
              className={styles.event_span}
            >
              {data.data.sourceData}
            </Link>
            {/* событию <span>{item.text.replace(/[a-z\w#]/gi, '')}</span> */}
          </p>
        </div>
      ) : data.data.type === 'EVENT_CREATE' ? (
        <div className={styles.event_container}>
          <Avatar imagePath={data.data.user.avatarPath} />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> создал новое событие: </span>
            <Link
              to={`/events/${data.data.sourceId}`}
              className={styles.event_span}
            >
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : data.data.type === 'EVENT_LEAVE' ? (
        <div className={styles.event_container}>
          <Avatar imagePath={data.data.user.avatarPath} />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>{' '}
            &nbsp;
            <span> покинул событие &nbsp;</span>
            <Link
              to={`/events/${data.data.sourceId}`}
              className={styles.event_span}
            >
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : data.data.type === 'EVENT_UPDATE' ? (
        <div className={styles.event_container}>
          <Avatar imagePath={data.data.user.avatarPath} />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span> изменил событие &nbsp;</span>
            <Link
              to={`/events/${data.data.sourceId}`}
              className={styles.event_span}
            >
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : (
        // EVENT_COMPLETE
        <div className={styles.event_container}>
          <Avatar imagePath={data.data.user.avatarPath} />
          <p>
            Ваш друг &nbsp;
            <Link
              to={`/users/${data.data.user.id}`}
              className={styles.event_span}
            >
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span> завершил событие &nbsp;</span>
            <Link
              to={`/events/${data.data.sourceId}`}
              className={styles.event_span}
            >
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default NotificationsEvents;
