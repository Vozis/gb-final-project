import styles from './favorite-button.module.scss';
import { HTMLAttributes, useEffect, useState } from 'react';
import cn from 'clsx';
import logo from './heart.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { IToggle } from '@project/shared/types';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';
import { useActions, useAuthRedux } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
  eventId: number;
}

export function FavoriteButton({
  eventId,
  className,
  ...rest
}: FavoriteButtonProps) {
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

  const { mutateAsync, isLoading } = useMutation(
    ['toggle-favorite-event'],
    (data: IToggle) => UserService.toggleFavorite(data),
    {
      onMutate: () => {
        toast.loading('Процесс запущен...', {
          id: 'toggle-favorite-success',
        });
      },
      onError: error => {
        // toast.error(errorCatch(error), {
        //   toastId: 'toggle-favorite-error',
        //   containerId: 1,
        // });
        toast.error(errorCatch(error), {
          id: 'toggle-favorite-success',
        });
      },
      onSuccess: async () => {
        setIsSmashed(!isSmashed);
        await queryClient.invalidateQueries(['get-all-events']);
        // toast.success('Статус события успешно изменен', {
        //   toastId: 'toggle-favorite-success',
        //   containerId: 1,
        // });
        toast.success('Статус события успешно изменен', {
          id: 'toggle-favorite-success',
        });
        getProfile();
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
      disabled={isLoading}
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
        className,
      )}
      style={{
        backgroundImage: `url(${logo})`,
      }}
      {...rest}
    />
  );
}

export default FavoriteButton;
