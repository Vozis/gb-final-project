import ProfileHead from '../../../profile-main/src/lib/profile-head/profile-head';
import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useAuthRedux } from '@project/shared/hooks';
import {
  CardList,
  CardSkeleton,
  ITab,
  SkeletonLoader,
  Tabs,
  UserBigSkeleton,
} from '@project/shared/ui';
import React from 'react';
import { useSingleUser } from './useSingleUser';
import styles from './single-user-main.module.scss';
import { incline, inclineFirstname } from 'lvovich';
import { IEventStatus } from '@project/shared/types';

/* eslint-disable-next-line */
export interface SingleUserMainProps {}

export function SingleUserMain(props: SingleUserMainProps) {
  const { id } = useParams();
  const { user } = useAuthRedux();

  if (!id) return null;

  const { isLoading, userData } = useSingleUser(id);

  const tabUserName = incline({ first: userData?.firstName }, 'genitive');
  console.log(tabUserName);

  const tabs: ITab[] = [
    {
      id: '1',
      label: `События ${tabUserName.first}`,
      content: (
        <div className={'flex flex-col gap-4'}>
          <CardList
            className={styles.tabs_list}
            list={
              userData?.creations?.filter(
                event => event.status !== IEventStatus.CLOSED,
              ) || []
            }
            title={'Активные события'}
          />
          <CardList
            className={styles.tabs_list}
            list={
              userData?.creations?.filter(
                event => event.status === IEventStatus.CLOSED,
              ) || []
            }
            title={'Завершенные события'}
          />
        </div>
      ),
    },
    {
      id: '2',
      label: 'Участвую',
      content: (
        <div className={'flex flex-col gap-4'}>
          <CardList
            className={styles.tabs_list}
            list={
              userData?.events?.filter(
                event => event.status !== IEventStatus.CLOSED,
              ) || []
            }
            title={'Активные события'}
          />
          <CardList
            className={styles.tabs_list}
            list={
              userData?.events?.filter(
                event => event.status === IEventStatus.CLOSED,
              ) || []
            }
            title={'Завершенные события'}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={'flex flex-col gap-3 '}>
      {isLoading ? (
        <>
          <UserBigSkeleton />
          <SkeletonLoader
            count={2}
            style={{
              height: '2.5rem',
              width: '100%',
              borderRadius: '50px',
            }}
            // className={'h-10 w-full rounded-[50px]'}
            containerClassName={
              'skeleton__bg p-3 flex gap-1 item-center justify-center rounded-full h-16'
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
    </div>
  );
}

export default SingleUserMain;
