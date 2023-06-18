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
  const queryClient = useQueryClient();
  const { getProfile } = useActions();
  const { filterParamsArray } = useFilterState();

  if (!id) return null;

  const { mutateAsync } = useMutation(
    ['toggle-user-to-event'],
    ({ eventId, toggleId }: { eventId: number; toggleId: number }) =>
      EventService.toggleUser(eventId, { toggleId, type: 'users' }),
    {
      onSuccess: async data => {
        await queryClient.invalidateQueries(['get-single-event']);
        // await queryClient.invalidateQueries(['get-all-events-auth']);
        // await queryClient.invalidateQueries(['get-all-events-auth-no-hobby']);
        // await queryClient.invalidateQueries(['get-profile-events']);
        await getProfile();
        toast.success('Изменение статуса участия прошло успешно', {
          containerId: 1,
          toastId: 'toggle-user',
        });
      },
      onError: async (err: AxiosError<{ message: string }>) => {
        const error = errorCatch(err);
        if (error === 'нельзя добавиться') {
          toast.error(
            'Свободные места закончились :( Попробуй поискать что-нибудь еще',
            {
              toastId: 'link-join-error',
              containerId: 1,
            },
          );
          await queryClient.invalidateQueries(['get-single-event']);
        }
      },
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
    },
  );

  if (!event) return null;

  const handleToggle = async (toggleId: number) => {
    // console.log(toggleId);
    await mutateAsync({ eventId: event.id, toggleId });
  };

  // console.log('event users', event.users);

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Описание',
      content: <p>{event.description}</p>,
    },
    {
      id: '2',
      label: 'Участвуют',
      content: (
        <List className={'flex flex-col gap-3'}>
          {event.users.length !== 0 ? (
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
        {user && <ToggleUserButton event={event} />}
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
          {event.tags.map(tag => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleEventMain;
