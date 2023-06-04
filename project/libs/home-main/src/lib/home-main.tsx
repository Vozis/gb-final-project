import styles from './home-main.module.scss';
import { Button, MaterialIcon, Modal, Search } from '@project/shared/ui';
import { CardList } from './card-list/card-list';
import CreateEventForm from './create-event-form/create-event-form';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';

import { useState } from 'react';

/* eslint-disable-next-line */

export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const [modalActive, setModalActive] = useState(false);

  const { isLoading, isError, data, error } = useQuery(
    ['get-all-events'],
    () => EventService.getAllEvents(),
    {
      select: ({ data }) => data,
    },
  );

  return (
    <div className={styles.container}>
      <Search list={data || []}></Search>
      <Button
        type={'button'}
        className={styles.btnAddEvent}
        onClick={() => setModalActive(true)}
      >
        <MaterialIcon name={'MdAdd'} className={styles.btnAddEvent__icon} />
      </Button>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreateEventForm setActive={setModalActive} />
      </Modal>
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
