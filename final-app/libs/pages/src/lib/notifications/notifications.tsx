import { NotificationsMain } from '@project/notifications-main';
import { useAuthRedux } from '@project/shared/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  // useEffect(() => {
  //   const dto: INotificationUpdateStatus = {
  //     ids: notifications.map(item => item.id),
  //     status: NotificationStatus.DELIVERED,
  //   };

  //   changeNotificationStatus({
  //     dto,
  //   });
  // }, []);
  return <NotificationsMain />;
}

export default Notifications;
