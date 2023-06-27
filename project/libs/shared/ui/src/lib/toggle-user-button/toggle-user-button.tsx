import styles from './toggle-user-button.module.scss';
import cn from 'clsx';
import { Button } from '../button/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';
import {
  useActions,
  useAuthRedux,
  useFilterState,
} from '@project/shared/hooks';
import { AxiosError } from 'axios';
import { errorCatch } from '@project/shared/utils';
import { IEvent, IEventForCard } from '@project/shared/types';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ToggleUserButtonProps {
  event: IEvent | IEventForCard;
}

export function ToggleUserButton({ event }: ToggleUserButtonProps) {
  const queryClient = useQueryClient();
  const { user } = useAuthRedux();
  const { getProfile } = useActions();
  const { filterParamsArray } = useFilterState();
  const navigate = useNavigate();
  const { submitToggleRoom } = useActions();

  if (!user) return null;

  const { mutateAsync, isLoading, reset } = useMutation(
    ['toggle-user-to-event'],
    ({ eventId, toggleId }: { eventId: number; toggleId: number }) =>
      EventService.toggleUser(eventId, { toggleId, type: 'users' }),
    {
      onSuccess: async data => {
        await queryClient.invalidateQueries([
          'get-all-events-auth',
          filterParamsArray,
        ]);
        await queryClient.invalidateQueries(['get-single-event']);
        await queryClient.invalidateQueries(['get-all-events-auth']);
        await queryClient.invalidateQueries(['get-all-events-auth-no-hobby']);
        await queryClient.invalidateQueries(['get-profile-events']);
        await getProfile();
        toast.success('Изменение статуса участия прошло успешно', {
          containerId: 1,
          toastId: 'toggle-user',
        });
      },
      onError: async (err: AxiosError<{ message: string }>) => {
        const error = errorCatch(err);
        console.log(error);
        if (error === 'Max people count exceeded') {
          toast.error(
            'Свободные места закончились :( Попробуй поискать что-нибудь еще',
            {
              toastId: 'link-join-error',
              containerId: 1,
            },
          );
          await queryClient.cancelQueries(['toggle-user-to-event']);
          // await queryClient.invalidateQueries(['get-single-event']);
        }
      },
    },
  );

  const handleToggle = async (toggleId: number) => {
    try {
      submitToggleRoom({ eventId: event.id });
      await mutateAsync({ eventId: event.id, toggleId });
    } catch (e) {
      console.log('Error:', e);
    }
  };

  return (
    <Button
      type={'button'}
      className={cn(styles.toggleBtn, 'w-full')}
      onClick={() => handleToggle(user.id)}
      disabled={
        event._count.users === event.peopleCount && !event.isParticipate
      }
    >
      {isLoading ? (
        'процесс идет...'
      ) : (
        <>
          {event.isParticipate
            ? 'Отказаться'
            : event._count.users === event.peopleCount
            ? 'Мест уже нет'
            : 'Присоединиться'}
        </>
      )}
    </Button>
  );
}

export default ToggleUserButton;
