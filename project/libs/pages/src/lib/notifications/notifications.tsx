import styles from './notifications.module.scss';
import {
  useActions,
  useAuthRedux,
  useCheckEventStatus,
  useCommentState,
  useNotificationState,
} from '@project/shared/hooks';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Button, Heading, List } from '@project/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { NotificationService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating';
import { INotificationUpdateStatus } from '@project/shared/types';
import { NotificationStatus } from '@prisma/client';

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
  const { changeNotificationStatus } = useActions();

  useEffect(() => {
    const dto: INotificationUpdateStatus = {
      ids: notifications.map(item => item.id),
      status: NotificationStatus.DELIVERED,
    };

    changeNotificationStatus({
      dto,
    });
  }, []);

  return (
    <div>
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
      </List>
    </div>
  );
}

export default Notifications;
