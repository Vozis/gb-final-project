import styles from './notifications.module.scss';
import { useAuthRedux, useNotificationState } from '@project/shared/hooks';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Button, Heading, List } from '@project/shared/ui';
import Rating from 'react-rating';

/* eslint-disable-next-line */
export interface NotificationsProps {}

export function Notifications(props: NotificationsProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const { finishedEvents } = useNotificationState();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, []);

  return (
    <div>
      <Heading>Уведомления</Heading>
      <List className={styles.notifications__list}>
        {finishedEvents?.map(item => (
          <div key={item.id} className={styles.notifications__item}>
            <span className={'text-sm'}>{item.name}</span>
            {/*<Rating />*/}
            <div>$Рейтинг$</div>
            <Button type={'button'}>Пропустить</Button>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Notifications;
