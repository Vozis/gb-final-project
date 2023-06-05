import styles from './home-main.module.scss';
import { Button, MaterialIcon, Modal, Search } from '@project/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { CardList } from './card-list/card-list';
import CreateEventForm from './create-event-form/create-event-form';

import { useEffect, useState } from 'react';
import { IEvent, ISearch, ISearchItem } from '@project/shared/types';
import { useDebounce } from 'usehooks-ts';
import axios from 'axios';
import { useAuthRedux } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  // const { user } = useAuthRedux();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterParamsArray, setFilterParamsArray] = useState<ISearchItem[]>([]);

  const debounceSearchInput = useDebounce(searchInput, 500);

  const { isLoading, isError, data, error } = useQuery(
    ['get-all-events', debounceSearchInput],
    () =>
      EventService.getAllEvents([
        { paramsSearch: 'name', valuesSearch: debounceSearchInput },
      ]),
    {
      select: ({ data }) => data,
    },
  );

  return (
    <div className={styles.container}>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      {/*<Button*/}
      {/*  className={styles.btnAddEvent}*/}
      {/*  onClick={() => setModalActive(true)}*/}
      {/*>*/}
      {/*  <MaterialIcon name={'MdAdd'} className={styles.btnAddEvent__icon} />*/}
      {/*</Button>*/}
      {/*<Modal active={modalActive} setActive={setModalActive}>*/}
      {/*  /!*<CreateEventForm setActive={setModalActive} />*!/*/}
      {/*</Modal>*/}
      {isLoading ? (
        <div>Загрузка...</div>
      ) : data?.length ? (
        <CardList list={data || []} />
      ) : (
        <div>Созданных событий пока нет :(</div>
      )}
    </div>
  );
}

export default HomeMain;
