import { EventService } from '@project/shared/services';
import {
  UserCardSmall,
  ITab,
  List,
  Tabs,
  TabsProps,
  Tag,
  Button,
  UserBig,
  ToggleUserButton,
  Comments,
  SkeletonLoader,
} from '@project/shared/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cn, { clsx } from 'clsx';
import { Link, useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SingleEventHead from './single-event-head/single-event-head';
import styles from './single-event-main.module.scss';
import {
  useActions,
  useAuthRedux,
  useFilterState,
  useSocketState,
} from '@project/shared/hooks';
import { AxiosError } from 'axios';
import { errorCatch } from '@project/shared/utils';
import { SingleEventHeadSkeleton } from './single-event-head/single-event-head-skeleton';
/* eslint-disable-next-line */
export interface SingleEventMainProps {
  tabs?: TabsProps;
}

export function SingleEventMain(props: SingleEventMainProps) {
  const [run, setRun] = useState(false);
  const { id } = useParams();
  const { user } = useAuthRedux();
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isActiveRoom, setIsActiveRoom] = useState<boolean>(false);
  const { activeRooms } = useSocketState();

  if (!id) return null;

  useEffect(() => {
    if (activeRooms.some(room => room.name === `room:${id}`)) {
      setIsActiveRoom(true);
    } else {
      setIsActiveRoom(false);
    }
  }, [id, activeRooms]);

  const { isLoading: isLoadingPublic, data: publicEvent } = useQuery(
    ['get-single-event-public'],
    () => EventService.getSingleEventNoUser(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        toast.success('Событие успешно получено', {
          containerId: 1,
          toastId: 'get-single-event',
        });
      },
      enabled: !!id,
    },
  );

  const { isLoading, data: event } = useQuery(
    ['get-single-event'],
    () => EventService.getSingleEvent(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        toast.success('Событие успешно получено', {
          containerId: 1,
          toastId: 'get-single-event',
        });
      },
      enabled: !!user && !!id,
    },
  );

  // if (!publicEvent) return null;

  // if (!event) return null;

  // console.log('event users', event.users);

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Описание',
      // content: <p>{event.description}</p>,
      content: <p>{event ? event.description : publicEvent?.description}</p>,
    },
    {
      id: '2',
      label: 'Участвуют',
      content: (
        <List className={'flex flex-col gap-3'}>
          {event ? (
            event.users.length !== 0 ? (
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
            )
          ) : publicEvent && publicEvent.users.length !== 0 ? (
            publicEvent.users.map(user => (
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
          )}
        </List>
      ),
    },
  ];

  // const { width, height } = useWindowSize();

  return (
    <div className={'flex-col flex gap-3'}>
      {isLoading ? <SingleEventHeadSkeleton /> : <SingleEventHead />}
      <div className={'flex flex-col gap-3'}>
        {user && event ? (
          <ToggleUserButton event={event} />
        ) : (
          <SkeletonLoader
            count={7}
            className={'h-6 w-4'}
            containerClassName={
              'bg-white p-3 flex gap-1 item-center justify-center rounded-full h-12'
            }
          />
        )}
        <Button onClick={() => setRun(true)}>Confetti ON</Button>
        {isLoading || isLoadingPublic ? (
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
          {user ? (
            <>
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
                      'bg-green-300 hover:bg-green-400':
                        tag?.type.name === 'city',
                      'bg-cyan-300 hover:bg-cyan-400':
                        tag?.type.name === 'sport',
                    })}
                  >
                    {tag.name}
                  </Tag>
                ))
              )}
            </>
          ) : (
            <>
              {isLoadingPublic ? (
                <SkeletonLoader
                  count={4}
                  className={'h-6 w-24 rounded-[50px]'}
                  containerClassName={
                    'bg-white p-3 flex gap-1 item-center justify-between rounded-xl h-12 w-full'
                  }
                />
              ) : (
                publicEvent &&
                publicEvent.tags.map(tag => (
                  <Tag
                    key={tag.id}
                    className={clsx({
                      'bg-red-300 hover:bg-red-400': tag?.type.name === 'count',
                      [styles.card__tag_place]: tag?.type.name === 'place',
                      'bg-green-300 hover:bg-green-400':
                        tag?.type.name === 'city',
                      'bg-cyan-300 hover:bg-cyan-400':
                        tag?.type.name === 'sport',
                    })}
                  >
                    {tag.name}
                  </Tag>
                ))
              )}
            </>
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
        ) : isLoadingPublic ? (
          ''
        ) : (
          <p>Комментарии доступны только для авторизованных пользователей</p>
        )}
      </div>
    </div>
  );
}

export default SingleEventMain;
