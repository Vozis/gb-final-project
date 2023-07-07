import { useQuery } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';
import { useAuthRedux } from '@project/shared/hooks';

export const useSingleUser = (id: string) => {
  const { user } = useAuthRedux();

  const { isLoading: isLoadingPublic, data: noUserData } = useQuery(
    ['get-single-user-public', id],
    () => UserService.getByIdNoUser(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        // toast.success('Данные пользователя получены', {
        //   toastId: 'get-single-user',
        //   containerId: 1,
        // });
        // toast.success('Данные пользователя получены', {
        //   id: 'get-single-user',
        // });
      },
      onError: err => {
        // toast.success(errorCatch(err), {
        //   toastId: 'get-single-user',
        //   containerId: 1,
        // });
        toast.error(errorCatch(err), {
          id: 'get-single-user',
        });
      },
      enabled: !user && !!id,
    },
  );

  const { isLoading: isLoadingAuth, data: userData } = useQuery(
    ['get-single-user', id],
    () => UserService.getById(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        // toast.success('Данные пользователя получены', {
        //   toastId: 'get-single-user',
        //   containerId: 1,
        // });
        // toast.success('Данные пользователя получены', {
        //   id: 'get-single-user',
        // });
      },
      onError: err => {
        // toast.success(errorCatch(err), {
        //   toastId: 'get-single-user',
        //   containerId: 1,
        // });
        toast.error(errorCatch(err), {
          id: 'get-single-user',
        });
      },
      enabled: !!user && !!id,
    },
  );

  return {
    isLoading: user ? isLoadingAuth : isLoadingPublic,
    userData: user ? userData : noUserData,
  };
};
