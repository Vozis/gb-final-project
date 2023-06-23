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
} from '@project/shared/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cn, { clsx } from 'clsx';
import { Link, useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SingleEventHead from './single-event-head/single-event-head';
import styles from './single-event-main.module.scss';
import {
  useActions,
  useAuthRedux,
  useFilterState,
} from '@project/shared/hooks';
import { AxiosError } from 'axios';
import { errorCatch } from '@project/shared/utils';
/* eslint-disable-next-line */
export interface SingleEventMainProps {
  tabs?: TabsProps;
}

export function SingleEventMain(props: SingleEventMainProps) {
  const [run, setRun] = useState(false);
  const { id } = useParams();
  const { user } = useAuthRedux();
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  if (!id) return null;

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
    <div className={styles['container']}>
      <SingleEventHead />
      <div>
        {user && event && <ToggleUserButton event={event} />}
        <Button onClick={() => setRun(true)}>Confetti ON</Button>
        <Tabs tabs={tabs} />
        {run && (
          <Confetti
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => setRun(false)}
          />
        )}

        <div className={styles.card__tags}>
          {event
            ? event.tags.map(tag => (
                <Tag
                  key={tag.id}
                  className={clsx({
                    'bg-red-300 hover:bg-red-400': tag?.type.name === 'count',
                    [styles.card__tag_place]: tag?.type.name === 'place',
                    'bg-green-300 hover:bg-green-400':
                      tag?.type.name === 'city',
                    'bg-cyan-300 hover:bg-cyan-400': tag?.type.name === 'sport',
                  })}
                >
                  {tag.name}
                </Tag>
              ))
            : publicEvent &&
              publicEvent.tags.map(tag => (
                <Tag
                  key={tag.id}
                  className={clsx({
                    'bg-red-300 hover:bg-red-400': tag?.type.name === 'count',
                    [styles.card__tag_place]: tag?.type.name === 'place',
                    'bg-green-300 hover:bg-green-400':
                      tag?.type.name === 'city',
                    'bg-cyan-300 hover:bg-cyan-400': tag?.type.name === 'sport',
                  })}
                >
                  {tag.name}
                </Tag>
              ))}
        </div>
        {user && event ? (
          <div>
            <Button onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
              {isCommentsOpen ? 'Скрыть ' : 'Показать '}
              комментарии
            </Button>
            {isCommentsOpen && <Comments eventId={String(event.id)} />}
          </div>
        ) : (
          <p>Комментарии доступны только для авторизованных пользователей</p>
        )}
      </div>
    </div>
  );
}

export default SingleEventMain;
