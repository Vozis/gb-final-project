import styles from './notifications-main.module.scss';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  // const { isLoading, data: event } = useQuery(
  //   ['get-single-event'],
  //   () => EventService.getFinishedEvents(id),
  //   {
  //     select: ({ data }) => data,
  //     onSuccess: () => {
  //       toast.success('Событие успешно получено', {
  //         containerId: 1,
  //         toastId: 'get-single-event',
  //       });
  //     },
  //   },
  // );
  return (
    <div className={styles['container']}>
      <h1>Welcome to NotificationsMain!</h1>
    </div>
  );
}

export default NotificationsMain;
