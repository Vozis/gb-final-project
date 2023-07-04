import { useActions, useNotificationState } from '@project/shared/hooks';
import { List } from '@project/shared/ui';
import { Link } from 'react-router-dom';
import styles from './notifications-events.module.scss';
/* eslint-disable-next-line */
export interface NotificationsEventsProps {}

export function NotificationsEvents(props: NotificationsEventsProps) {
  // ушел в notification.tsx
  // const { user } = useAuthRedux();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/auth');
  //   }
  // }, []);

  const { notifications, count } = useNotificationState();
  console.log('notifications: ', notifications);
  // notifications.map(notification => console.log(notification.type));
  // const index = notifications.map(item => item.type === 'EVENT_PARTICIPATE');
  // console.log('index: ', index);

  // const card = notifications.find(function (item) {
  //   return item.type.match(/EVENT/);
  // });
  // console.log('card: ', card);

  const notiEvents = notifications.filter(item => item.type.match(/EVENT/));
  console.log('notiEvents: ', notiEvents);

  const { changeNotificationStatus } = useActions();
  console.log('changeNotificationStatus: ', changeNotificationStatus);

  // ушел в notification.tsx
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
      <List className={styles.notifications__list}>
        {notiEvents?.map(item => (
          // -----------------------------------------------------------------------
          <div key={item.id}>
            {item.type === 'EVENT_PARTICIPATE' ? (
              <div className={styles.event_container}>
                {/* @ts-ignore */}
                <img src={item.user.avatarPath} alt={'avatar'} />
                <p>
                  Вашь друг{' '}
                  <Link
                    to={`/users/${item.user.id}`}
                    className={styles.event_span}
                  >
                    {' '}
                    {/* @ts-ignore */}
                    {item.user.firstName}
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
                  Вашь друг{' '}
                  <Link
                    to={`/users/${item.user.id}`}
                    className={styles.event_span}
                  >
                    {item.user.userName}
                  </Link>{' '}
                  создал новое событие {'  '}
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
                Вашь друг{' '}
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
                Вашь друг{' '}
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

export default NotificationsEvents;
