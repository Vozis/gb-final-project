import styles from './card.module.scss';
import { Button, MaterialIcon, Tag } from '@project/shared/ui';
import { IEvent, ITag, IToggle } from '@project/shared/types';
import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { useAuthRedux } from '@project/shared/hooks';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// import toast from 'react-hot-toast';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEvent;
}

export const Card: FC<CardProps> = ({
  event: { imageUrl, name, description, tags, id },
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { user } = useAuthRedux();

  const { mutateAsync } = useMutation(
    ['toggle-user-to-event'],
    (toggleId: number) =>
      EventService.toggleUser(id, { toggleId, type: 'users' }),
    {
      onSuccess: data => {
        console.log(data.data.name);
        toast.success('Вы успешно присоединились к событию', {
          containerId: 1,
          toastId: 'toggle-user',
        });
      },
    },
  );

  const handleToggle = async (toggleId: number) => {
    console.log(toggleId);

    await mutateAsync(toggleId);
  };
  const handleFavouriteBtn = () => {
    setIsFavourite(!isFavourite);
  };
  useEffect(() => {
    isFavourite && toast.success('Добавлено в избранное');
  }, [isFavourite]);

  // if (isFavourite) toast('Добавлено в избранное');
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), linear-gradient(180deg, rgba(0, 0, 0, 0) 50.51%, rgba(0, 0, 0, 0.64) 79.75%), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user && (
        <button
          className={clsx(styles.card__favouriteBtn, {
            [styles.card__favouriteBtn__active]: isFavourite,
          })}
          onClick={handleFavouriteBtn}
        ></button>
      )}
      <div className={styles.card__info}>
        <Link to={`/events/${id}`}>
          <span className={styles.card__title}>{name}</span>
        </Link>
        <div className={styles.card__tags}>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              className={clsx({
                'bg-red-300 hover:bg-red-400': tag.type === 'count',
                [styles.card__tag_place]: tag.type === 'place',
                'bg-green-300 hover:bg-green-400': tag.type === 'city',
                'bg-cyan-300 hover:bg-cyan-400': tag.type === 'sport',
              })}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
        {user && (
          <Button
            type={'button'}
            className={styles.card__btn}
            onClick={() => handleToggle(user.id)}
          >
            Присоединиться
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
