import { useAuthRedux, useUserEvents } from '@project/shared/hooks';
import { EventService } from '@project/shared/services';
import { IEventForCard, ISearch, IUserEdit } from '@project/shared/types';
import {
  CardList,
  CardSkeleton,
  ITab,
  SkeletonLoader,
  Tabs,
  TabsProps,
  UserBigSkeleton,
  UserCardSmall,
} from '@project/shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProfileHead from './profile-head/profile-head';
import styles from './profile-main.module.scss';
import Accordion from '../../../shared/ui/src/lib/accordion/accordion';
import React, { useEffect, useRef } from 'react';

/* eslint-disable-next-line */

export interface ProfileMainProps {
  tabs?: TabsProps;
}

export function ProfileMain(props: ProfileMainProps) {
  const { user } = useAuthRedux();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, []);

  if (!user) {
    return null;
  }

  // console.log('render profile');

  // const { mutateAsync } = useMutation(['update-user'], data =>
  //   axios.put('/api/users/profile', data),
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IUserEdit>({
    mode: 'onChange',
  });

  const { myEvents, participationArr, isLoading, isSuccess } = useUserEvents(
    user.id,
  );

  const tabs: ITab[] = [
    {
      id: '1',
      label: 'Мои события',
      content: <CardList list={myEvents} />,
    },
    {
      id: '2',
      label: 'Участвую',
      content: <CardList list={participationArr} />,
    },
  ];

  // console.log(profileEvents.data);

  // const { isLoading: isLoadingTags, data: times } = useQuery(
  //   ['get-tags-count'],
  //   () => axios.get<ITag[]>('/api/tags/by-type/count'),
  //   {
  //     select: ({ data: times }) =>
  //       times.map(
  //         (time): IOption => ({
  //           label: time.name,
  //           value: time.id,
  //         }),
  //       ),
  //     onError: err => {
  //       toast.error(errorCatch(err));
  //     },
  //   },
  // );

  const onSubmit: SubmitHandler<IUserEdit> = async data => {
    // try {
    //   console.log(data);
    //   const res = await axios.post('/api/auth/login', data);
    //   console.log(res.data);
    //   localStorage.setItem('user', JSON.stringify(res.data));
    //   toast.success('Login Success');
    // } catch (err) {
    //   toast.error(errorCatch(err));
    // }
  };

  return (
    <div className={'flex flex-col gap-3'}>
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
        <ProfileHead userProps={user} />
      )}
      {user && user.friends && (
        <Accordion title={'Друзья'}>
          {user.friends.map(user => (
            <UserCardSmall userProps={user} />
          ))}
        </Accordion>
      )}

      {!isLoading && <Tabs tabs={tabs} />}
    </div>
  );
}

export default ProfileMain;
