import styles from './home-main.module.scss';
import {
  UserCardSmall,
  CardList,
  CardSkeleton,
  Filter,
  MaterialIcon,
  SkeletonLoader,
} from '@project/shared/ui';

import React, { useEffect } from 'react';
import { IOption } from '@project/shared/types';
import {
  useActions,
  useAuthRedux,
  useCheckEventStatus,
  useFilterState,
} from '@project/shared/hooks';
import { useFilter } from '../../../shared/ui/src/lib/filter/useFilter';

import { Link } from 'react-router-dom';
import cn from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { MailService } from '@project/shared/services';

/* eslint-disable-next-line */
export interface HomeMainProps {}

const options: IOption[] = [
  { value: 1, label: 'Более 5 человек' },
  { value: 2, label: 'До 5 человек' },
];

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();

  const { finishedEvents } = useCheckEventStatus();

  console.log(finishedEvents);

  const { setFilterParamsArray, getProfile } = useActions();
  const { filterParamsArray } = useFilterState();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const { mutateAsync } = useMutation(['resend-confirmation-link'], () =>
    MailService.resendConfirmationLink(),
  );

  console.log('render');

  const { isLoading, events, onSubmit } = useFilter(
    filterParamsArray,
    setFilterParamsArray,
  );

  return (
    <div className={styles.container}>
      <div>
        {user && (
          <UserCardSmall
            userProps={user}
            className={styles.profile__img_wrapper}
            isName
            isPhoto
          />
        )}
        {!user?.isConfirmed && (
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
      <Link
        to={'/create-event'}
        className={cn({
          'pointer-events-none text-red-500': !user?.isConfirmed,
        })}
      >
        <MaterialIcon name={'MdAdd'} className={styles.btnAddEvent__icon} />
      </Link>
      <Filter onSubmit={onSubmit} />
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
      ) : events?.length ? (
        <CardList list={events || []} title={'Актуальные для вас'} />
      ) : (
        <div>Созданных событий пока нет :(</div>
      )}
    </div>
  );
}

export default HomeMain;
