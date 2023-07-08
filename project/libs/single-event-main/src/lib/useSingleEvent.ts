import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';
import { useAuthRedux } from '@project/shared/hooks';

export const useSingleEvent = (id: string) => {
  const { user } = useAuthRedux();

  const { isLoading: isLoadingPublic, data: publicEvent } = useQuery(
    ['get-single-event-public', id],
    () => EventService.getSingleEventNoUser(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        // toast.success('Событие успешно получено', {
        //   containerId: 1,
        //   toastId: 'get-single-event',
        // });
        // toast.success('Событие успешно получено', {
        //   id: 'get-single-event-no-auth',
        // });
      },
      onError: error => {
        toast.error(errorCatch(error));
      },
      enabled: !user && !!id,
    },
  );

  const { isLoading, data: event } = useQuery(
    ['get-single-event', id],
    () => EventService.getSingleEvent(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        // toast.success('Событие успешно получено', {
        //   containerId: 1,
        //   toastId: 'get-single-event',
        // });
        // toast.success('Событие успешно получено', {
        //   id: 'get-single-event-auth',
        // });
      },
      onError: error => {
        toast.error(errorCatch(error));
      },
      enabled: !!user && !!id,
    },
  );

  return {
    isLoading: user ? isLoading : isLoadingPublic,
    event: event ? event : publicEvent,
  };
};
