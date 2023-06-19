import styles from './single-user-main.module.scss';
import ProfileHead from '../../../profile-main/src/lib/profile-head/profile-head';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { IEventForCard } from '@project/shared/types';
import { useAuthRedux, useUserEvents } from '@project/shared/hooks';
import { CardList, ITab, Tabs } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface SingleUserMainProps {}

export function SingleUserMain(props: SingleUserMainProps) {
  const { id } = useParams();
  const { user } = useAuthRedux();

  if (!id) return null;
  if (!user) return null;

  const { isLoading, data: userData } = useQuery(
    ['get-single-user'],
    () => UserService.getById(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        toast.success('Данные пользователя получены', {
          toastId: 'get-single-user',
          containerId: 1,
        });
      },
      onError: err => {
        toast.success(errorCatch(err), {
          toastId: 'get-single-user',
          containerId: 1,
        });
      },
    },
  );

  if (!userData) return null;

  // console.log('user creations: ', user.creations);
  // console.log('user events: ', user.creations);

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Мои события',
      content: <CardList list={userData.creations || []} />,
    },
    {
      id: '2',
      label: 'Участвую',
      content: <CardList list={userData.events || []} />,
    },
  ];

  return (
    <div className={'flex flex-col items-stretch'}>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <>
          <ProfileHead userProps={userData} />
          <Tabs tabs={tabs} />
        </>
      )}
    </div>
  );
}

export default SingleUserMain;
