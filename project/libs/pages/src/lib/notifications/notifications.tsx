import {
  useActions,
  useAuthRedux,
  useNotificationState,
} from '@project/shared/hooks';
import { Heading, List } from '@project/shared/ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <div key={item.id}>
            {item.type === 'EVENT_PARTICIPATE' ? (
              <div className={styles.event_container}>
                <p>
                  Вашь друг{' '}
                  <span className={styles.event_span}>
                    {item.user.userName}
                  </span>{' '}
                  присоединился к событию{' '}
                  <span className={styles.event_span}>{item.sourceData}</span>
                  {/* событию <span>{item.text.replace(/[a-z\w#]/gi, '')}</span> */}
                </p>
              </div>
            ) : item.type === 'EVENT_CREATE' ? (
              <div className={styles.event_container}>
                <p>
                  Вашь друг{' '}
                  <span className={styles.event_span}>
                    {item.user.userName}
                  </span>{' '}
                  создал новое событие{'  '}
                  <span className={styles.event_span}>{item.sourceData}</span>
                </p>
              </div>
            ) : item.type === 'EVENT_LEAVE' ? (
              <div className={styles.event_container}>
                Вашь друг{' '}
                <span className={styles.event_span}>{item.user.userName}</span>{' '}
                покинул событие{' '}
                <span className={styles.event_span}>{item.sourceData}</span>
              </div>
            ) : item.type === 'EVENT_UPDATE' ? (
              <div className={styles.event_container}>
                Вашь друг{' '}
                <span className={styles.event_span}>{item.user.userName}</span>{' '}
                изменил событие{' '}
                <span className={styles.event_span}>{item.sourceData}</span>
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
