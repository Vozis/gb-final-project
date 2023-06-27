import styles from './single-user-main.module.scss';
import ProfileHead from '../../../profile-main/src/lib/profile-head/profile-head';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { IEventForCard } from '@project/shared/types';
import { useAuthRedux, useUserEvents } from '@project/shared/hooks';
import {
  CardList,
  CardSkeleton,
  ITab,
  SkeletonLoader,
  Tabs,
  UserBigSkeleton,
} from '@project/shared/ui';
import React from 'react';

/* eslint-disable-next-line */
export interface SingleUserMainProps {}

export function SingleUserMain(props: SingleUserMainProps) {
  const { id } = useParams();
  const { user } = useAuthRedux();

  if (!id) return null;

  const { isLoading: isLoadingNoUser, data: noUserData } = useQuery(
    ['get-single-user-public'],
    () => UserService.getByIdNoUser(id),
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
      enabled: !!id,
    },
  );

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
      enabled: !!user && !!id,
    },
  );

  // if (!userData) return null;
  // if (!noUserData) return null;

  // console.log('user creations: ', user.creations);
  // console.log('user events: ', user.creations);

  // console.log(userData);
  // console.log(noUserData);

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Мои события',
      content: (
        <CardList
          list={user ? userData?.creations || [] : noUserData?.creations || []}
        />
      ),
    },
    {
      id: '2',
      label: 'Участвую',
      content: (
        <CardList
          list={user ? userData?.events || [] : noUserData?.events || []}
        />
      ),
    },
  ];

  return (
    <div className={'flex flex-col gap-3 '}>
      {user ? (
        <>
          {isLoading ? (
            <>
              <UserBigSkeleton />
              <SkeletonLoader
                count={2}
                className={'h-10 w-full rounded-[50px]'}
                containerClassName={
                  'bg-white p-3 flex gap-1 item-center justify-center rounded-full h-16'
                }
              />
              <CardSkeleton count={3} />
            </>
          ) : (
            <>
              {userData && <ProfileHead userProps={userData} />}
              <Tabs tabs={tabs} />
            </>
          )}
        </>
      ) : (
        <>
          {isLoadingNoUser ? (
            <>
              <UserBigSkeleton />
              <SkeletonLoader
                count={2}
                className={'h-10 w-full rounded-[50px]'}
                containerClassName={
                  'bg-white p-3 flex gap-1 item-center justify-center rounded-full h-16'
                }
              />
              <CardSkeleton count={3} />
            </>
          ) : (
            <>
              {noUserData && <ProfileHead userProps={noUserData} />}
              <Tabs tabs={tabs} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SingleUserMain;
