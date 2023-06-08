import styles from './favorite-button.module.scss';
import { useEffect, useState } from 'react';
import cn from 'clsx';
import logo from './heart.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { IToggle } from '@project/shared/types';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { useActions, useAuthRedux } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface FavoriteButtonProps {
  eventId: number;
}

export function FavoriteButton({ eventId }: FavoriteButtonProps) {
  const { user } = useAuthRedux();

  const { getProfile } = useActions();

  const [isSmashed, setIsSmashed] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const isFavorite = user?.favorites
      ? user?.favorites?.some(item => item.id === eventId)
      : false;

    if (isSmashed !== isFavorite) setIsSmashed(isFavorite);
  }, [isSmashed, user, eventId]);

  const { mutateAsync } = useMutation(
    ['toggle-favorite-event'],
    (data: IToggle) => UserService.toggleFavorite(data),
    {
      onError: error => {
        toast.error(errorCatch(error), {
          toastId: 'toggle-favorite-error',
          containerId: 1,
        });
      },
      onSuccess: async () => {
        setIsSmashed(!isSmashed);
        getProfile();
        await queryClient.invalidateQueries(['get-all-events']);
        toast.success('Статус события успешно изменен', {
          toastId: 'toggle-favorite-success',
          containerId: 1,
        });
      },
    },
  );

  const handleClick = async () => {
    const data: IToggle = {
      toggleId: eventId,
      type: 'favorites',
    };

    await mutateAsync(data);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        // [styles.button],
        {
          [styles.animate]: isSmashed,
        },
        {
          [styles.animateReverse]: !isSmashed,
        },
        { [styles.button]: isSmashed },
        { [styles.buttonReverse]: !isSmashed },
      )}
      style={{
        backgroundImage: `url(${logo})`,
      }}
    />
  );
}

export default FavoriteButton;
