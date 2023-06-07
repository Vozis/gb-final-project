import styles from './home-main.module.scss';
import {
  Button,
  Field,
  Filter,
  MaterialIcon,
  Modal,
  RadioField,
  SearchField,
  SelectField,
  SkeletonLoader,
} from '@project/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { CardList } from './card-list/card-list';
import CreateEventForm from './create-event-form/create-event-form';

import { useEffect, useState } from 'react';
import {
  IEvent,
  IOption,
  ISearch,
  ISearchForm,
  ISearchItem,
} from '@project/shared/types';
import { useDebounce } from 'usehooks-ts';
import axios from 'axios';
import { useAuthRedux } from '@project/shared/hooks';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import debounce from 'debounce';
import { useFilter } from '../../../shared/ui/src/lib/filter/useFilter';

/* eslint-disable-next-line */
export interface HomeMainProps {}

const options: IOption[] = [
  { value: 1, label: 'Более 5 человек' },
  { value: 2, label: 'До 5 человек' },
];

export function HomeMain(props: HomeMainProps) {
  // const { user } = useAuthRedux();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [filterParamsArray, setFilterParamsArray] = useState<ISearch>({});

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
      <Filter onSubmit={onSubmit} />
      {isLoading ? (
        <SkeletonLoader count={1} height={48} className={'mt-4'} />
      ) : events?.length ? (
        <CardList list={events || []} />
      ) : (
        <div>Созданных событий пока нет :(</div>
      )}
    </div>
  );
}

export default HomeMain;
