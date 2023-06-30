import styles from './notifications-main.module.scss';
import { useQuery } from '@tanstack/react-query';
import { EventService, NotificationService } from '@project/shared/services';
import { toast } from 'react-toastify';
import {
  useActions,
  useAuthRedux,
  useNotificationState,
} from '@project/shared/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import { NotificationStatus } from '@prisma/client';
import { INotificationUpdateStatus } from '@project/shared/types';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const { notifications, count } = useNotificationState();
  const { changeNotificationStatus } = useActions();

  // console.log(notifications);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, []);

  if (!user) {
    return null;
  }

  useEffect(() => {
    const dto: INotificationUpdateStatus = {
      ids: notifications.map(item => item.id),
      status: NotificationStatus.DELIVERED,
    };

    console.log('dto:', dto);
    changeNotificationStatus({
      dto,
    });
  }, []);

  return (
    <div className={styles['container']}>
      {/*{finishedEvents.map(item => (*/}
      {/*  <div>{item.name}</div>*/}
      {/*))}*/}
    </div>
  );
}

export default NotificationsMain;
