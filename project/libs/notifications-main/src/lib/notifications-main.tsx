import { useActions, useNotificationState } from '@project/shared/hooks';
import { List } from '@project/shared/ui';
import React, { useEffect } from 'react';
import NotificationComment from './notification-comment/notification-comment';
import NotificationEventComplete from './notification-event-complete/notification-event-complete';
import NotificationEvent from './notification-event/notification-event';
import NotificationFriend from './notification-friend/notification-friend';
import { useLocation } from 'react-router-dom';
import {
  INotificationStatus,
  INotificationUpdateStatus,
} from '@project/shared/types';
import { NotificationEventCompleteSkeleton } from './notification-event-complete/notification-event-complete-skeleton';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { notifications, count, isLoading } = useNotificationState();
  const { pathname } = useLocation();
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

  useEffect(() => {
    if (pathname === '/notifications') {
      // console.log('delivered');
      const dto: INotificationUpdateStatus = {
        ids: notifications
          .filter(note => note.status === INotificationStatus.SENT)
          .map(item => item.id),
        status: INotificationStatus.DELIVERED,
      };
      changeNotificationStatus({ dto });
    }
  }, [notifications, count, pathname]);

  return (
    <>
      {notifications.some(note => note.status === INotificationStatus.SENT) && (
        <List
          title={'Новые уведомления'}
          headingClassName={'text-center'}
          className={''}
        >
          {notifications
            .filter(
              notification => notification.status === INotificationStatus.SENT,
            )
            .map(notification => (
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
      )}
      {notifications.some(
        note => note.status === INotificationStatus.DELIVERED,
      ) && (
        <List
          title={'Просмотренные уведомления'}
          headingClassName={'text-center'}
          className={''}
        >
          {notifications
            .filter(note => note.status === INotificationStatus.DELIVERED)
            .map(notification => (
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
      )}
    </>
  );
}

export default NotificationsMain;
