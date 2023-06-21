import styles from './notifications-main.module.scss';
import { useQuery } from '@tanstack/react-query';
import { EventService, NotificationService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { useAuthRedux } from '@project/shared/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, []);

  if (!user) {
    return null;
  }
  // const { isLoading: isLoadingFinishedEvents, data: finishedEvents } = useQuery(
  //   ['get-finished-events'],
  //   () => NotificationService.getFinishedEvents(),
  //   {
  //     select: ({ data }) => data,
  //     onSuccess: () => {
  //       toast.success('Событие успешно получено', {
  //         containerId: 1,
  //         toastId: 'get-finished-event',
  //       });
  //     },
  //   },
  // );
  // if (!finishedEvents) {
  //   return null;
  // }
  return (
    <div className={styles['container']}>
      {/*{finishedEvents.map(item => (*/}
      {/*  <div>{item.name}</div>*/}
      {/*))}*/}
    </div>
  );
}

export default NotificationsMain;
