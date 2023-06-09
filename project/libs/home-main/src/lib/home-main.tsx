import styles from './home-main.module.scss';
import { Avatar, Filter, MaterialIcon } from '@project/shared/ui';
import { CardList } from './card-list/card-list';

import React, { useEffect } from 'react';
import { IOption, ISearch } from '@project/shared/types';
import {
  useActions,
  useAuthRedux,
  useFilterState,
} from '@project/shared/hooks';
import { useFilter } from '../../../shared/ui/src/lib/filter/useFilter';
import { CardSkeleton } from './card/card-skeleton';
import { Link } from 'react-router-dom';
import cn from 'clsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventService, MailService } from '@project/shared/services';

/* eslint-disable-next-line */
export interface HomeMainProps {}

const options: IOption[] = [
  { value: 1, label: 'Более 5 человек' },
  { value: 2, label: 'До 5 человек' },
];

export function HomeMain(props: HomeMainProps) {
  const { user } = useAuthRedux();

  const { setFilterParamsArray, getProfile } = useActions();
  const { filterParamsArray } = useFilterState();

  useEffect(() => {
    getProfile();
  }, []);

  const { mutateAsync } = useMutation(['resend-confirmation-link'], () =>
    MailService.resendConfirmationLink(),
  );

  const { isLoading, events, onSubmit } = useFilter(
    filterParamsArray,
    setFilterParamsArray,
  );

  // const filterParamsArray1: ISearch = {
  //   filterNestedFieldsParams: [
  //     {
  //       paramsCategory: 'users',
  //       paramsType: 'id',
  //       nestedFieldValue: user.id,
  //     },
  //   ],
  //   filterEventFieldsParams: [
  //     {
  //       paramsFilter: 'creator',
  //       eventFieldValue: user.id,
  //     },
  //   ],
  // };
  //
  // const { data } = useQuery([''], () =>
  //   EventService.getAllEvents(filterParamsArray1),
  // );

  return (
    <div className={styles.container}>
      <div>
        {user && (
          <Avatar
            user={user}
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
        <CardSkeleton count={3} />
      ) : events?.length ? (
        <CardList list={events || []} />
      ) : (
        <div>Созданных событий пока нет :(</div>
      )}
    </div>
  );
}

export default HomeMain;
