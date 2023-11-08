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
  UserSmallSkeleton,
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
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { useMediaQuery } from 'react-responsive';
import { FilterSkeleton } from '../../../shared/ui/src/lib/filter/filter-skeleton';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 992px)',
  });

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
    setSearchTerm,
  } = useFilter();

  const { data: allEvents } = useQuery(
    ['get-all-events-auth-no-hobby'],
    () => EventService.getAllEvents('AND', {}, false),
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
            status: event.status,
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
  // console.log(foundUsers);
  // console.log('isUseFilter: ', isUseFilter);

  return (
    <div className={'flex flex-col gap-5'}>
      <div>
        {user && (
          <div className={'flex justify-between items-center mt-10'}>
            {isLoading ? (
              <UserSmallSkeleton hasBtn classWrapper={'w-full'} />
            ) : (
              <>
                <UserCardSmall
                  userProps={user}
                  className={styles.profile__img_wrapper}
                  isName
                  isPhoto
                />
                <Link
                  to={'/create-event'}
                  className={cn('p-2 text-3xl', {
                    'pointer-events-none text-red-500': !user?.isConfirmed,
                  })}
                  data-tooltip-id="add-event-tooltip"
                >
                  <MaterialIcon
                    name={'MdAdd'}
                    className={styles.addEventIcon}
                  />
                </Link>
                <Tooltip
                  id="add-event-tooltip"
                  content={'Добавить событие'}
                  place={'left'}
                  style={{
                    color: 'var(--primary-color)',
                    backgroundColor: 'var(--accent-info-color)',
                  }}
                />
              </>
            )}
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
      {isLoading ? (
        isDesktopOrLaptop ? (
          <FilterSkeleton classWrapper={`w-[580px]`} />
        ) : (
          <FilterSkeleton classWrapper={`w-full`} />
        )
      ) : (
        <Filter
          setSearchTerm={setSearchTerm}
          onSubmit={onSubmit}
          setIsUseFilter={setIsUseFilter}
          setIsEvent={setIsEvent}
          isEvent={isEvent}
        />
      )}

      {!isUseFilter ? (
        <>
          {isLoading ? (
            <>
              <SkeletonLoader
                style={{
                  borderRadius: '0.75rem',
                }}
                // className={'rounded-xl'}
                containerClassName={
                  'p-2 skeleton__bg w-full mb-3 box-border block rounded-xl'
                }
              />
              {isDesktopOrLaptop ? (
                <CardSkeleton classWrapper={`flex-row`} count={2} />
              ) : (
                <CardSkeleton classWrapper={`flex-col`} count={2} />
              )}
            </>
          ) : (
            isEvent && (
              <CardList
                className={styles.mainCardList}
                list={events || []}
                title={'Актуальные для вас'}
              />
            )
          )}
          {isLoading ? (
            <>
              <SkeletonLoader
                style={{
                  borderRadius: '0.75rem',
                }}
                // className={'rounded-xl'}
                containerClassName={
                  'p-2 skeleton__bg w-full mb-3 box-border block rounded-xl'
                }
              />
              {isDesktopOrLaptop ? (
                <CardSkeleton classWrapper={`flex-row`} count={2} />
              ) : (
                <CardSkeleton classWrapper={`flex-col`} count={2} />
              )}
            </>
          ) : (
            <CardList
              className={styles.mainCardList}
              list={allEvents || []}
              title={'Все события'}
            />
          )}
        </>
      ) : (
        <>
          {isLoadingWithFilter ? (
            <>
              <SkeletonLoader
                style={{
                  borderRadius: '0.75rem',
                }}
                // className={'rounded-xl'}
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
