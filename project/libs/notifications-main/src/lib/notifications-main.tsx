import { Heading, List } from '@project/shared/ui';
import NotificationsComments from './notifications-comments/notifications-comments';
import NotificationsEvents from './notifications-events/notifications-events';
import NotificationsFriends from './notifications-friends/notifications-friends';
import styles from './notifications-main.module.scss';
/* eslint-disable-next-line */
export interface NotificationsMainProps {}

export function NotificationsMain(props: NotificationsMainProps) {
  return (
    <div className={styles.notifications}>
      <Heading>Уведомления</Heading>
      <NotificationsEvents />
      <NotificationsFriends />
      <NotificationsComments />
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
