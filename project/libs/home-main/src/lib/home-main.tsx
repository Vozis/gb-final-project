import styles from './home-main.module.scss';
import {
  CardList,
  CardSkeleton,
  Filter,
  List,
  MaterialIcon,
  SkeletonLoader,
  useFilter,
  UserCardSmall,
} from '@project/shared/ui';
import React from 'react';
import { IEventForCard } from '@project/shared/types';
import { useAuthRedux } from '@project/shared/hooks';

import { Link } from 'react-router-dom';
import cn from 'clsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventService, MailService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const { mutateAsync, isLoading: isMutateLoading } = useMutation(
    ['resend-confirmation-link'],
    () => MailService.resendConfirmationLink(),
    {
      onMutate: () => {
        toast.loading('Отправка нового подтверждения...', {
          id: 'resend-confirmation-email',
        });
      },
      onSuccess: () => {
        toast.success('Успешно отправлено, проверьте почту :)', {
          id: 'resend-confirmation-email',
        });
      },
      onError: error => {
        toast.error(errorCatch(error), {
          id: 'resend-confirmation-email',
        });
      },
    },
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

  const handleConfirmEmailLink = async () => {
    console.log('click');

    await mutateAsync();
  };

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
              <button
                onClick={handleConfirmEmailLink}
                className={cn('text-blue-500 underline cursor-pointer', {
                  ['text-gray-500 cursor-wait']: isMutateLoading,
                })}
                disabled={isMutateLoading}
              >
                отправьте новый запрос
              </button>
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
