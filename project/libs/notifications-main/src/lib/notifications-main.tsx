import { useActions, useNotificationState } from '@project/shared/hooks';
import { List } from '@project/shared/ui';
import React from 'react';
import NotificationComment from './notification-comment/notification-comment';
import NotificationEventComplete from './notification-event-complete/notification-event-complete';
import NotificationEvent from './notification-event/notification-event';
import NotificationFriend from './notification-friend/notification-friend';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { notifications, count } = useNotificationState();
  // console.log(
  //   'notifications: ',
  //   notifications.filter(item => item.type === 'EVENT_COMPLETE'),
  // );

  // const notiEvents = notifications.filter(item => item.type.match(/FRIEND/));
  // console.log('notiEvents: ', notiEvents);

  // const index = notifications.map(item => item.type.match(/EVENT/) !== null);
  // console.log('index: ', index);
  // notifications.map(notification => console.log('notification', notification));
  const { changeNotificationStatus } = useActions();
  // console.log('changeNotificationStatus: ', changeNotificationStatus);

  return (
    <List title={'Уведомления'} headingClassName={'text-center'} className={''}>
      {notifications.map(notification => (
        <React.Fragment key={notification.id}>
          {notification.type.match(/EVENT_COMPLETE/) !== null ? (
            <NotificationEventComplete data={notification} />
          ) : // <p>заглушка</p>
          notification.type.match(/EVENT/) !== null ? (
            <NotificationEvent data={notification} />
          ) : // <p>заглушка</p>
          notification.type.match(/FRIEND/) !== null ? (
            <NotificationFriend data={notification} />
          ) : (
            // <p>заглушка</p>
            <NotificationComment data={notification} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

export default NotificationsMain;
