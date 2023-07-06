import { INotification } from '@project/shared/types';
import { Link } from 'react-router-dom';
import Avatar from '../../../../shared/ui/src/lib/avatar/avatar';
import styles from './notifications-comments.module.scss';
/* eslint-disable-next-line */
export interface NotificationsCommentsProps {
  data: INotification;
}

export function NotificationsComments(data: NotificationsCommentsProps) {
  console.log('data: ', data);
  return (
    // <div className={styles['container']}>
    //   <h1>Welcome to NotificationsComments!</h1>
    // </div>
    <div className={styles.notifications}>
      <div className={styles.notifications__list}>
        <div key={data.data.id}>
          {data.data.type === 'COMMENT_CREATE' ? (
            <div className={styles.event_container}>
              {/* <img src={data.data.user.avatarPath} alt={'avatar'} /> */}

              <Avatar imagePath={data.data.user.avatarPath} />
              <p>
                Ваш друг &nbsp;
                <Link
                  to={`/users/${data.data.user.id}`}
                  className={styles.event_span}
                >
                  {data.data.user.firstName} {data.data.user.lastName}
                </Link>
                <span>
                  {' '}
                  добавил коментарий "{data.data.sourceData}" к событию&nbsp;
                </span>
                <Link
                  to={`/events/${data.data.sourceId}`}
                  className={styles.event_span}
                >
                  {data.data.additionalData}
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
                <span>
                  ответил на вашь коментарий "{data.data.additionalData}"&nbsp;
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsComments;
