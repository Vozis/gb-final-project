import styles from './home-main.module.scss';
import {
  UserCardSmall,
  CardList,
  CardSkeleton,
  Filter,
  MaterialIcon,
  SkeletonLoader,
  UserSmallSkeleton,
  List,
} from '@project/shared/ui';
import React, { useEffect, useState } from 'react';
import { IEventForCard, IOption, ISearch } from '@project/shared/types';
import {
  useActions,
  useAuthRedux,
  useCheckEventStatus,
  useFilterState,
  useNotificationState,
} from '@project/shared/hooks';

import { Link, useNavigate } from 'react-router-dom';
import cn from 'clsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventService, MailService } from '@project/shared/services';
import { useFilter } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const { mutateAsync } = useMutation(['resend-confirmation-link'], () =>
    MailService.resendConfirmationLink(),
  );

  const {
    isLoading,
    events,
    foundUsers,
    onSubmit,
    isUseFilter,
    isLoadingWithFilter,
    filterEvents,
    setIsUseFilter,
    isEvent,
    setIsEvent,
  } = useFilter();

  const { data: allEvents } = useQuery(
    ['get-all-events-auth-no-hobby'],
    () => EventService.getAllEvents({}, false),
    {
      select: ({ data: events }) =>
        events.map(
          (event): IEventForCard => ({
            id: event.id,
            name: event.name,
            imageUrl: event.imageUrl,
            tags: event.tags,
            eventTime: event.eventTime,
            creator: event.creator,
            users: event.users,
            peopleCount: event.peopleCount,
            _count: event._count,
            isParticipate: event.isParticipate,
          }),
        ),
      enabled: !!user,
    },
  );

  // console.log('isEvent: ', isEvent);

  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        {user && (
          <div className={'flex justify-between items-center'}>
            <UserCardSmall
              userProps={user}
              className={styles.profile__img_wrapper}
              isName
              isPhoto
            />
            <Link
              to={'/create-event'}
              className={cn('p-3 text-3xl', {
                'pointer-events-none text-red-500': !user?.isConfirmed,
              })}
            >
              <MaterialIcon
                name={'MdAdd'}
                className={styles.btnAddEvent__icon}
              />
            </Link>
          </div>
        )}
        <div>
          {user && !user?.isConfirmed && (
            <p>
              Для создания события необходимо подтвердить email. Проверьте свою
              почту или{' '}
              <span
                onClick={() => mutateAsync()}
                className={'text-blue-500 underline '}
              >
                отправьте новый запрос
              </span>
            </p>
          )}
        </div>
      </div>
      <Filter
        onSubmit={onSubmit}
        setIsUseFilter={setIsUseFilter}
        setIsEvent={setIsEvent}
        isEvent={isEvent}
      />
      {!isUseFilter ? (
        <>
          {isLoading ? (
            <>
              <SkeletonLoader
                className={'rounded-xl'}
                containerClassName={
                  'p-2 bg-white w-full mb-3 box-border block rounded-xl'
                }
              />
              <CardSkeleton count={3} />
            </>
          ) : (
            isEvent && (
              <CardList list={events || []} title={'Актуальные для вас'} />
            )
          )}
          {isLoading ? (
            <>
              <SkeletonLoader
                className={'rounded-xl'}
                containerClassName={
                  'p-2 bg-white w-full mb-3 box-border block rounded-xl'
                }
              />
              <CardSkeleton count={3} />
            </>
          ) : (
            <CardList list={allEvents || []} title={'Все события'} />
          )}
        </>
      ) : (
        <>
          {isLoadingWithFilter ? (
            <>
              <SkeletonLoader
                className={'rounded-xl'}
                containerClassName={
                  'p-2 bg-white w-full mb-3 box-border block rounded-xl'
                }
              />
              <CardSkeleton count={3} />
            </>
          ) : isEvent ? (
            <CardList list={filterEvents || []} title={'Результаты поиска'} />
          ) : (
            <List className={'flex flex-col gap-3'} title={'Результаты поиска'}>
              {foundUsers && foundUsers.length !== 0 ? (
                foundUsers.map(user => (
                  <UserCardSmall
                    userProps={user}
                    key={user.id}
                    isName
                    isPhoto
                  />
                ))
              ) : (
                <p>Пока здесь никого нет</p>
              )}
            </List>
          )}
        </>
      )}
    </div>
  );
}

export default HomeMain;
