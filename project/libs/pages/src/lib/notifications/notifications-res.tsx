import {
  useActions,
  useAuthRedux,
  useNotificationState,
} from '@project/shared/hooks';
import { Heading, List } from '@project/shared/ui';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './notifications.module.scss';
/* eslint-disable-next-line */
export interface NotificationsProps {}

export function Notifications(props: NotificationsProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, []);

  const { notifications, count } = useNotificationState();
  // console.log('notifications: ', notifications);
  // notifications.map(notification => console.log(notification.type));
  // const index = notifications.map(item => item.type === 'EVENT_PARTICIPATE');
  // console.log('index: ', index);

  // const card = notifications.find(function (item) {
  //   return item.type.match(/EVENT/);
  // });
  // console.log('card: ', card);

  const notiEvents = notifications.filter(item => item.type.match(/EVENT/));
  // console.log('notiEvents: ', notiEvents);

  const { changeNotificationStatus } = useActions();
  console.log('changeNotificationStatus: ', changeNotificationStatus);

  // useEffect(() => {
  //   const dto: INotificationUpdateStatus = {
  //     ids: notifications.map(item => item.id),
  //     status: NotificationStatus.DELIVERED,
  //   };

  //   changeNotificationStatus({
  //     dto,
  //   });
  // }, []);

  return (
    <div className={styles.notifications}>
      <Heading>Уведомления</Heading>
      <List className={styles.notifications__list}>
        {/*{finishedEvents?.map(item => (*/}
        {/*  <div*/}
        {/*    key={item.id}*/}
        {/*    className={styles.notifications__item + ' rounded-xl'}*/}
        {/*  >*/}
        {/*    <span className={'text-sm'}>{item.name}</span>*/}
        {/*    <div className={'grow'}>*/}
        {/*      <Rating transition allowFraction SVGclassName={'inline h-8'} />*/}
        {/*    </div>*/}
        {/*    <Button*/}
        {/*      className={*/}
        {/*        'transition ease-in border-2 rounded-xl hover:bg-slate-50'*/}
        {/*      }*/}
        {/*      type={'button'}*/}
        {/*    >*/}
        {/*      Пропустить*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*))}*/}

        {notiEvents?.map(item => (
          // -----------------------------------------------------------------------
          <div key={item.id}>
            {item.type === 'EVENT_PARTICIPATE' ? (
              <div className={styles.event_container}>
                <p>
                  Ваш друг{' '}
                  <Link
                    to={`/users/${item.user.id}`}
                    className={styles.event_span}
                  >
                    {item.user.userName}
                  </Link>
                  {/* <span className={styles.event_span}>
                    {item.user.userName}
                  </span>{' '} */}
                  присоединился к событию{' '}
                  <Link
                    to={`/events/${item.sourceId}`}
                    className={styles.event_span}
                  >
                    {item.sourceData}
                  </Link>
                  {/* событию <span>{item.text.replace(/[a-z\w#]/gi, '')}</span> */}
                </p>
              </div>
            ) : // --------------------------------------------------------------------------------
            item.type === 'EVENT_CREATE' ? (
              <div className={styles.event_container}>
                <p>
                  Ваш друг{' '}
                  <Link
                    to={`/users/${item.user.id}`}
                    className={styles.event_span}
                  >
                    {item.user.userName}
                  </Link>{' '}
                  создал новое событие{'  '}
                  <Link
                    to={`/events/${item.sourceId}`}
                    className={styles.event_span}
                  >
                    {item.sourceData}
                  </Link>
                </p>
              </div>
            ) : // ------------------------------------------------------------------------------
            item.type === 'EVENT_LEAVE' ? (
              <div className={styles.event_container}>
                Ваш друг{' '}
                <Link
                  to={`/users/${item.user.id}`}
                  className={styles.event_span}
                >
                  {item.user.userName}
                </Link>{' '}
                покинул событие{' '}
                <Link
                  to={`/events/${item.sourceId}`}
                  className={styles.event_span}
                >
                  {item.sourceData}
                </Link>
              </div>
            ) : // ------------------------------------------------------------------------------
            item.type === 'EVENT_UPDATE' ? (
              <div className={styles.event_container}>
                Ваш друг{' '}
                <Link
                  to={`/users/${item.user.id}`}
                  className={styles.event_span}
                >
                  {item.user.userName}
                </Link>{' '}
                изменил событие{' '}
                <Link
                  to={`/events/${item.sourceId}`}
                  className={styles.event_span}
                >
                  {item.sourceData}
                </Link>
              </div>
            ) : (
              <p>Пусто</p>
            )}
          </div>
        ))}
      </List>
    </div>
  );
}

export default Notifications;

// ---------------------------------------------------------------------------------

// import styles from './notifications-main.module.scss';
// import { useQuery } from '@tanstack/react-query';
// import { EventService, NotificationService } from '@project/shared/services';
// import { toast } from 'react-toastify';
// import {
//   useActions,
//   useAuthRedux,
//   useNotificationState,
// } from '@project/shared/hooks';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { data } from 'autoprefixer';
// import { NotificationStatus } from '@prisma/client';
// import { INotificationUpdateStatus } from '@project/shared/types';

// /* eslint-disable-next-line */
// export interface NotificationsMainProps {}

// export function NotificationsMain(props: NotificationsMainProps) {
//   const { user } = useAuthRedux();
//   const navigate = useNavigate();
//   const { notifications, count } = useNotificationState();
//   const { changeNotificationStatus } = useActions();

//   // console.log(notifications);

//   useEffect(() => {
//     if (!user) {
//       navigate('/auth');
//     }
//   }, []);

//   if (!user) {
//     return null;
//   }

//   useEffect(() => {
//     const dto: INotificationUpdateStatus = {
//       ids: notifications.map(item => item.id),
//       status: NotificationStatus.DELIVERED,
//     };

//     console.log('dto:', dto);
//     changeNotificationStatus({
//       dto,
//     });
//   }, []);

//   return (
//     <div className={styles['container']}>
//       {/*{finishedEvents.map(item => (*/}
//       {/*  <div>{item.name}</div>*/}
//       {/*))}*/}
//     </div>
//   );
// }

// export default NotificationsMain;
