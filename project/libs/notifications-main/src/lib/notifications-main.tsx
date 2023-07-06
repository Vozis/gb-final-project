import { useActions, useNotificationState } from '@project/shared/hooks';
import { List } from '@project/shared/ui';
import React from 'react';
import NotificationsComments from './notifications-comments/notifications-comments';
import NotificationsEvents from './notifications-events/notifications-events';
import NotificationsFriends from './notifications-friends/notifications-friends';
import styles from './notifications-main.module.scss';
/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { notifications, count } = useNotificationState();
  console.log('notifications: ', notifications);

  const notiEvents = notifications.filter(item => item.type.match(/FRIEND/));
  console.log('notiEvents: ', notiEvents);

  // const index = notifications.map(item => item.type.match(/EVENT/) !== null);
  // console.log('index: ', index);
  // notifications.map(notification => console.log('notification', notification));
  const { changeNotificationStatus } = useActions();
  // console.log('changeNotificationStatus: ', changeNotificationStatus);

  return (
    <div className={styles.notifications}>
      {/* <Heading>Уведомления</Heading> */}
      <List title={'Уведомлния'}>
        {notifications.map(notification => (
          <React.Fragment key={notification.id}>
            {notification.type.match(/EVENT/) !== null ? (
              <NotificationsEvents data={notification} />
            ) : // <p>заглушка</p>
            notification.type.match(/FRIEND/) !== null ? (
              <NotificationsFriends data={notification} />
            ) : (
              // <p>заглушка</p>
              <NotificationsComments data={notification} />
            )}
          </React.Fragment>
        ))}
      </List>

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
      </List>
    </div>
  );
}

export default NotificationsMain;
