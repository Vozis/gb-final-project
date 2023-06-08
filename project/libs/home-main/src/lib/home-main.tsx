import styles from './home-main.module.scss';
import { Filter, MaterialIcon } from '@project/shared/ui';
import { CardList } from './card-list/card-list';

import React from 'react';
import { IOption } from '@project/shared/types';
import { useActions, useFilterState } from '@project/shared/hooks';
import { useFilter } from '../../../shared/ui/src/lib/filter/useFilter';
import { CardSkeleton } from './card/card-skeleton';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomeMainProps {}

const options: IOption[] = [
  { value: 1, label: 'Более 5 человек' },
  { value: 2, label: 'До 5 человек' },
];

export function HomeMain(props: HomeMainProps) {
  // const { user } = useAuthRedux();
  // const [modalActive, setModalActive] = useState<boolean>(false);
  const { filterParamsArray } = useFilterState();

  const { setFilterParamsArray } = useActions();

  // const {
  //   isLoading,
  //   isError,
  //   data: events,
  //   error,
  // } = useQuery(
  //   ['get-all-events', filterParamsArray],
  //   () => EventService.getAllEvents(filterParamsArray),
  //   {
  //     select: ({ data }) => data,
  //     enabled: !!filterParamsArray,
  //   },
  // );

  const { isLoading, events, onSubmit } = useFilter(
    filterParamsArray,
    setFilterParamsArray,
  );

  return (
    <div className={styles.container}>
      <Link to={'/create-event'}>
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
