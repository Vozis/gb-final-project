import styles from './card.module.scss';
import { Button, FavoriteButton, Tag } from '@project/shared/ui';
import { IEventForCard } from '@project/shared/types';
import { FC } from 'react';
import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActions, useAuthRedux } from '@project/shared/hooks';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { Link, redirect } from 'react-router-dom';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEventForCard;
}

export const Card: FC<CardProps> = ({ event }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthRedux();
  const { getProfile } = useActions();

  if (!user) {
    redirect('/auth');
  }

  const { mutateAsync } = useMutation(
    ['toggle-user-to-event'],
    (toggleId: number) =>
      EventService.toggleUser(event.id, { toggleId, type: 'users' }),
    {
      onSuccess: async data => {
        await queryClient.invalidateQueries(['get-all-events']);
        // await queryClient.invalidateQueries(['get-single-user']);
        await queryClient.invalidateQueries(['get-profile-events']);
        await getProfile();
        toast.success('Изменение статуса участия прошло успешно', {
          containerId: 1,
          toastId: 'toggle-user',
        });
      },
    },
  );

  const handleToggle = async (toggleId: number) => {
    await mutateAsync(toggleId);
  };

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
        {user && (
          <Button
            type={'button'}
            className={cn(styles.card__btn, 'w-full')}
            onClick={() => handleToggle(user.id)}
          >
            {user.events && user.events.some(item => item.id === event.id)
              ? 'Отказаться'
              : 'Присоединиться'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
