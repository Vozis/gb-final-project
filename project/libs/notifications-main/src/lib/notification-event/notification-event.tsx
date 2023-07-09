import { INotification } from '@project/shared/types';
import { Avatar } from '@project/shared/ui';
import { Link } from 'react-router-dom';
import styles from './notification-event.module.scss';
import { TbCalendarEvent } from 'react-icons/tb';
import {
  MdOutlineEventAvailable,
  MdOutlineEventBusy,
  MdOutlineEventNote,
} from 'react-icons/md';

/* eslint-disable-next-line */
export interface NotificationsEventsProps {
  data: INotification;
}

export function NotificationEvent(data: NotificationsEventsProps) {
  // console.log('data: ', data.data);
  return (
    <>
      {data.data.type === 'EVENT_PARTICIPATE' ? (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <MdOutlineEventAvailable className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> присоединился к событию </span>
            <Link to={`/events/${data.data.sourceId}`} className={styles.span}>
              {data.data.sourceData}
            </Link>
            {/* событию <span>{item.text.replace(/[a-z\w#]/gi, '')}</span> */}
          </p>
        </div>
      ) : data.data.type === 'EVENT_CREATE' ? (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <TbCalendarEvent className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            <span> создал новое событие: </span>
            <Link to={`/events/${data.data.sourceId}`} className={styles.span}>
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : data.data.type === 'EVENT_LEAVE' ? (
        <div className={styles.container} id={`notification-${data.data.id}`}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <MdOutlineEventBusy className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>{' '}
            &nbsp;
            <span> покинул событие &nbsp;</span>
            <Link to={`/events/${data.data.sourceId}`} className={styles.span}>
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : data.data.type === 'EVENT_UPDATE' ? (
        <div className={styles.container}>
          <div className={styles.avatar_space}>
            <Avatar
              imagePath={data.data.user.avatarPath}
              className={styles.avatar}
            />
            <MdOutlineEventNote className={styles.infoIcon} />
          </div>
          <p>
            Ваш друг &nbsp;
            <Link to={`/users/${data.data.user.id}`} className={styles.span}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Link>
            &nbsp;
            <span> изменил событие &nbsp;</span>
            <Link to={`/events/${data.data.sourceId}`} className={styles.span}>
              {data.data.sourceData}
            </Link>
          </p>
        </div>
      ) : (
        // EVENT_COMPLETE
        ''
        // <div className={styles.container}>
        //   <span className={'text-sm'}>{item.name}</span>
        //   <div className={'grow'}>
        //     <Rating transition allowFraction SVGclassName={'inline h-8'} />
        //   </div>
        //   <Button
        //     className={
        //       'transition ease-in border-2 rounded-xl hover:bg-slate-50'
        //     }
        //     type={'button'}
        //   >
        //     Пропустить
        //   </Button>
        // </div>
        // <div className={styles.container}>
        //   <Avatar
        //     imagePath={data.data.user.avatarPath}
        //     className={styles.avatar}
        //   />
        //   <p>
        //     Ваш друг &nbsp;
        //     <Link to={`/users/${data.data.user.id}`} className={styles.span}>
        //       {data.data.user.firstName} {data.data.user.lastName}
        //     </Link>
        //     &nbsp;
        //     <span> завершил событие &nbsp;</span>
        //     <Link to={`/events/${data.data.sourceId}`} className={styles.span}>
        //       {data.data.sourceData}
        //     </Link>
        //   </p>
        // </div>
      )}
    </>
  );
}

export default NotificationEvent;
