import {
  Button,
  Comments,
  ITab,
  List,
  SkeletonLoader,
  Tabs,
  TabsProps,
  Tag,
  ToggleUserButton,
  UserCardSmall,
} from '@project/shared/ui';
import { clsx } from 'clsx';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import SingleEventHead from './single-event-head/single-event-head';
import styles from './single-event-main.module.scss';
import {
  useActions,
  useAuthRedux,
  useNotificationState,
  useSocketState,
} from '@project/shared/hooks';
import { SingleEventHeadSkeleton } from './single-event-head/single-event-head-skeleton';
import { useSingleEvent } from './useSingleEvent';

export interface SingleEventMainProps {
  tabs?: TabsProps;
}

export function SingleEventMain(props: SingleEventMainProps) {
  const [run, setRun] = useState(false);
  const { id } = useParams();
  if (!id) return null;
  const { user } = useAuthRedux();
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isActiveRoom, setIsActiveRoom] = useState<boolean>(false);
  const { activeRooms } = useSocketState();
  const { event, isLoading } = useSingleEvent(id);

  const { notifications } = useNotificationState();
  const { changeNotificationStatus } = useActions();

  useEffect(() => {
    if (
      activeRooms.length &&
      activeRooms.some(room => room.name === `room:${id}`)
    ) {
      setIsActiveRoom(true);
    } else {
      setIsActiveRoom(false);
    }
  }, [id, activeRooms]);

  // console.log('notifications from event-main: ', notifications);

  // useEffect(() => {
  //   console.log('start');
  //   console.log(notifications.length);

  //   const readNotifications: number[] = notifications
  //     .filter(item => {
  //       if (
  //         item.moreData === +id &&
  //         item.type === NotificationType.COMMENT_CREATE
  //       ) {
  //         return item;
  //       } else if (
  //         item.type === NotificationType.COMMENT_REPLY &&
  //         item.moreData === +id
  //       ) {
  //         return item;
  //       } else if (
  //         item.type === NotificationType.EVENT_CREATE &&
  //         item.sourceId === +id
  //       ) {
  //         return item;
  //       } else if (
  //         item.type === NotificationType.EVENT_UPDATE &&
  //         item.sourceId === +id
  //       ) {
  //         return item;
  //       }
  //     })
  //     .map(item => item.id);

  //   console.log('readNotifications: ', readNotifications);

  //   const dto: INotificationUpdateStatus = {
  //     ids: readNotifications,
  //     status: NotificationStatus.DELIVERED,
  //   };

  //   changeNotificationStatus({ dto });
  // }, []); чтобы не удалялись уведомления

  // if (!publicEvent) return null;

  // if (!event) return null;

  // console.log('event users', event.users);

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Описание',
      // content: <p>{event.description}</p>,
      content: <p>{event && event.description}</p>,
    },
    {
      id: '2',
      label: 'Участвуют',
      content: (
        <List className={'flex flex-col gap-3'}>
          {event &&
            (event.users.length !== 0 ? (
              event.users.map(user => (
                <UserCardSmall
                  userProps={user}
                  key={user.id}
                  isName
                  isInfo
                  isPhoto
                />
              ))
            ) : (
              <p>Пока здесь никого нет</p>
            ))}
        </List>
      ),
    },
  ];

  return (
    <div className={'flex-col flex gap-3'}>
      {isLoading ? (
        <SingleEventHeadSkeleton />
      ) : (
        event && <SingleEventHead event={event} />
      )}
      <div className={'flex flex-col gap-3'}>
        {user && event ? (
          <ToggleUserButton event={event} />
        ) : user ? (
          <SkeletonLoader
            count={7}
            className={'h-6 w-4'}
            containerClassName={
              'bg-white p-3 flex gap-1 item-center justify-center rounded-full h-12'
            }
          />
        ) : (
          ''
        )}
        {/*<Button onClick={() => setRun(true)}>Confetti ON</Button>*/}
        {isLoading ? (
          <SkeletonLoader
            count={2}
            className={'h-10 w-full rounded-[50px]'}
            containerClassName={
              'bg-white p-3 flex gap-1 item-center justify-center rounded-full h-16'
            }
          />
        ) : (
          <Tabs tabs={tabs} />
        )}

        {run && (
          <Confetti
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => setRun(false)}
          />
        )}

        <div className={styles.card__tags}>
          {isLoading ? (
            <SkeletonLoader
              count={4}
              className={'h-6 w-24 rounded-[50px]'}
              containerClassName={
                'bg-white p-3 flex gap-1 item-center justify-between rounded-xl h-12 w-full'
              }
            />
          ) : (
            event &&
            event.tags.map(tag => (
              <Tag
                key={tag.id}
                className={clsx({
                  'bg-red-300 hover:bg-red-400': tag?.type.name === 'count',
                  [styles.card__tag_place]: tag?.type.name === 'place',
                  'bg-green-300 hover:bg-green-400': tag?.type.name === 'city',
                  'bg-cyan-300 hover:bg-cyan-400': tag?.type.name === 'sport',
                })}
              >
                {tag.name}
              </Tag>
            ))
          )}
        </div>
        {user ? (
          <div>
            {isLoading ? (
              <SkeletonLoader
                count={1}
                className={'h-5 w-1/2 rounded-[50px]'}
                containerClassName={
                  'bg-white p-3 flex gap-1 item-center justify-between rounded-full h-12 w-full'
                }
              />
            ) : (
              <>
                {isActiveRoom ? (
                  <Button onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                    {isCommentsOpen ? 'Скрыть ' : 'Показать '}
                    комментарии
                  </Button>
                ) : (
                  <p>Комментарии доступны только для участников события</p>
                )}
                {event && isActiveRoom && isCommentsOpen && (
                  <Comments event={event} />
                )}
              </>
            )}
          </div>
        ) : (
          <p>Комментарии доступны только для авторизованных пользователей</p>
        )}
      </div>
    </div>
  );
}

export default SingleEventMain;
