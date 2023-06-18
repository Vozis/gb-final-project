import styles from './card.module.scss';
import {
  Button,
  FavoriteButton,
  Tag,
  ToggleUserButton,
} from '@project/shared/ui';
import { IEvent, IEventForCard } from '@project/shared/types';
import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useActions,
  useAuthRedux,
  useFilterState,
} from '@project/shared/hooks';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { Link, redirect } from 'react-router-dom';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEventForCard;
}

export const Card: FC<CardProps> = ({ event }) => {
  // const queryClient = useQueryClient();
  const { user } = useAuthRedux();
  // const { getProfile } = useActions();
  // const { filterParamsArray } = useFilterState();

  if (!user) {
    redirect('/auth');
  }
  // console.log('event: ', event);

  // const { mutateAsync } = useMutation(
  //   ['toggle-user-to-event'],
  //   (toggleId: number) =>
  //     EventService.toggleUser(event.id, { toggleId, type: 'users' }),
  //   {
  //     onSuccess: async data => {
  //       await queryClient.invalidateQueries([
  //         'get-all-events-auth',
  //         filterParamsArray,
  //       ]);
  //       await queryClient.invalidateQueries(['get-all-events-auth']);
  //       await queryClient.invalidateQueries(['get-all-events-auth-no-hobby']);
  //       await queryClient.invalidateQueries(['get-profile-events']);
  //       await getProfile();
  //       toast.success('Изменение статуса участия прошло успешно', {
  //         containerId: 1,
  //         toastId: 'toggle-user',
  //       });
  //     },
  //   },
  // );
  //
  // const handleToggle = async (toggleId: number) => {
  //   await mutateAsync(toggleId);
  // };

  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${event.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user && <FavoriteButton eventId={event.id} />}
      <div className={styles.card__info}>
        <Link to={`/events/${event.id}`} className={styles.card__title}>
          {event.name}
        </Link>
        <p className={'text-white'}>
          {event.users.length < event.peopleCount &&
            `осталось ${event.users.length - event.peopleCount} мест`}
          {event.users.length === event.peopleCount && `нет мест`}
        </p>

        <div className={styles.card__tags}>
          {event.tags.map(tag => (
            <Tag
              key={tag.id}
              className={clsx({
                'bg-red-300 hover:bg-red-400': tag?.type?.name === 'count',
                [styles.card__tag_place]: tag?.type?.name === 'place',
                'bg-green-300 hover:bg-green-400': tag?.type?.name === 'city',
                'bg-cyan-300 hover:bg-cyan-400': tag?.type?.name === 'sport',
              })}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
        {user && <ToggleUserButton event={event} />}
      </div>
    </div>
  );
};

export default Card;
