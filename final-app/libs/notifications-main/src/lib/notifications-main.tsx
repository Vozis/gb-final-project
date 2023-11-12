import { useActions, useNotificationState } from '@project/shared/hooks';
import { List, SkeletonLoader } from '@project/shared/ui';
import React, { useEffect, useState } from 'react';
import NotificationComment from './notification-comment/notification-comment';
import NotificationEventComplete from './notification-event-complete/notification-event-complete';
import NotificationEvent from './notification-event/notification-event';
import NotificationFriend from './notification-friend/notification-friend';
import { useLocation } from 'react-router-dom';
import {
  EnumNotificationStatusFront,
  INotificationUpdateStatus,
} from '@project/shared/types';
import { NotificationEventSkeleton } from './notification-event/notification-event-skeleton';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { notifications, count } = useNotificationState();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  console.log('notifications: ', notifications);

  useEffect(() => {
    if (notifications.length) setIsLoading(false);
  }, [notifications]);

  useEffect(() => {
    if (pathname === '/notifications') {
      // console.log('delivered');
      const dto: INotificationUpdateStatus = {
        ids: notifications
          .filter(note => note.status === EnumNotificationStatusFront.SENT)
          .map(item => item.id),
        status: EnumNotificationStatusFront.DELIVERED,
      };
      changeNotificationStatus({ dto });
    }
  }, [notifications, count, pathname]);

  return (
    <div className={'flex flex-col gap-6'}>
      {isLoading ? (
        <div>
          <SkeletonLoader
            style={{
              borderRadius: '0.75rem',
            }}
            // className={'rounded-xl'}
            containerClassName={
              'skeleton__bg p-2 w-full mb-3 box-border block rounded-xl'
            }
          />
          <div className={'flex flex-col gap-4'}>
            {[...Array(4).keys()].map(item => (
              <NotificationEventSkeleton key={item} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {notifications.some(
            note => note.status === EnumNotificationStatusFront.SENT,
          ) && (
            <List
              title={'Новые уведомления'}
              headingClassName={'text-center'}
              className={''}
            >
              {notifications
                .filter(
                  notification =>
                    notification.status === EnumNotificationStatusFront.SENT,
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
        </>
      )}
      {isLoading ? (
        <div>
          <SkeletonLoader
            style={{
              borderRadius: '0.75rem',
            }}
            // className={'rounded-xl'}
            containerClassName={
              'skeleton__bg p-2 w-full mb-3 box-border block rounded-xl'
            }
          />
          <div className={'flex flex-col gap-4'}>
            {[...Array(4).keys()].map(item => (
              <NotificationEventSkeleton key={item} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {notifications.some(
            note => note.status === EnumNotificationStatusFront.DELIVERED,
          ) && (
            <List
              title={'Просмотренные уведомления'}
              headingClassName={'text-center'}
              className={''}
            >
              {notifications
                .filter(note => note.status === EnumNotificationStatusFront.DELIVERED)
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
      )}
    </div>
  );
}

export default NotificationsMain;
