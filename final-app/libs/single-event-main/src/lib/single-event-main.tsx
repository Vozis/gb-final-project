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
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import cn from 'clsx';
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
import {
  IEventStatus,
  EnumNotificationStatusFront,
  INotificationUpdateStatus,
  EnumNotificationType,
} from '@project/shared/types';
import { EventStatus } from '@prisma/client';

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
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const { notifications } = useNotificationState();
  const { changeNotificationStatus } = useActions();

  useEffect(() => {
    event?.users.some(participant => participant.id === user?.id)
      ? setIsParticipant(true)
      : setIsParticipant(false);
  }, [user, event]);

  // console.log(event);
  // console.log('isParticipant', isParticipant);

  // console.log('activeRooms: ', activeRooms);

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

  useEffect(() => {
    // console.log('start');
    // console.log(notifications.length);

    const readNotifications: number[] = notifications
      .filter(item => {
        if (
          item.moreData === +id &&
          item.type === EnumNotificationType.COMMENT_CREATE &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        } else if (
          item.type === EnumNotificationType.COMMENT_REPLY &&
          item.moreData === +id &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        } else if (
          item.type === EnumNotificationType.EVENT_CREATE &&
          item.sourceId === +id &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        } else if (
          item.type === EnumNotificationType.EVENT_UPDATE &&
          item.sourceId === +id &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        } else if (
          item.type === EnumNotificationType.EVENT_PARTICIPATE &&
          item.sourceId === +id &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        } else if (
          item.type === EnumNotificationType.EVENT_LEAVE &&
          item.sourceId === +id &&
          item.status === EnumNotificationStatusFront.SENT
        ) {
          return item;
        }
      })
      .map(item => item.id);

    console.log('readNotifications: ', readNotifications);

    const dto: INotificationUpdateStatus = {
      ids: readNotifications,
      status: EnumNotificationStatusFront.DELIVERED,
    };

    changeNotificationStatus({ dto });
  }, []);
  // чтобы не удалялись уведомления

  if (!event) return null;

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
      label: 'Участники',
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
          event.status !== IEventStatus.CLOSED && (
            <ToggleUserButton event={event} />
          )
        ) : user ? (
          <SkeletonLoader
            count={7}
            style={{
              height: '1.5rem',
              width: '1rem',
            }}
            // className={'h-6 w-4'}
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
            style={{
              height: '2.5rem',
              width: '100%',
              borderRadius: '100px',
            }}
            // className={'h-10 w-full rounded-[50px]'}
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
              style={{
                height: '1.5rem',
                width: '6rem',
                borderRadius: '100px',
              }}
              // className={'h-6 w-24 rounded-[50px]'}
              containerClassName={
                'bg-white p-3 flex gap-1 item-center justify-between rounded-xl h-12 w-full'
              }
            />
          ) : (
            event &&
            event.tags.map(tag => (
              <Tag
                key={tag.id}
                className={cn({
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
                style={{
                  height: '1.25rem',
                  width: '50%',
                  borderRadius: '100px',
                }}
                // className={'h-5 w-1/2 rounded-[50px]'}
                containerClassName={
                  'bg-white p-3 flex gap-1 item-center justify-between rounded-full h-12 w-full'
                }
              />
            ) : (
              <>
                {event.status === IEventStatus.OPEN ? (
                  <>
                    {isActiveRoom && isParticipant ? (
                      <Button
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                      >
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
                ) : (
                  <p>
                    Для завершенного события комментарии оставлять невозможно
                  </p>
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
