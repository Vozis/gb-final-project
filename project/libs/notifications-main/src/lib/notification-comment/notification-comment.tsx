import { INotification } from '@project/shared/types';
import { Link } from 'react-router-dom';
import { Avatar } from '@project/shared/ui';
import styles from './notification-comment.module.scss';
import React from 'react';
import { FaRegComment } from 'react-icons/fa6';

/* eslint-disable-next-line */
export interface NotificationsCommentsProps {
  data: INotification;
}

export function NotificationComment(data: NotificationsCommentsProps) {
  // console.log('data: ', data);
  return (
    <>
      {data.data.type === 'COMMENT_CREATE' ? (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <FaRegComment className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span>
              {' '}
              добавил комментарий "{data.data.sourceData}" к событию&nbsp;
            </span>
            <Link to={`/events/${data.data.moreData}`} className={styles.span}>
              {data.data.additionalData}
            </Link>
          </p>
        </div>
      ) : (
        // EVENT_COMPLETE
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <FaRegComment className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span>
              ответил на ваш комментарий "{data.data.additionalData}"&nbsp;
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default NotificationComment;
