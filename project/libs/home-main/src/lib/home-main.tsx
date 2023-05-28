import styles from './home-main.module.scss';
import { Button, Modal, Search } from '@project/shared/ui';
import { CardList } from './card-list/card-list';
import CreateEventForm from './create-event-form/create-event-form';
import { faker } from '@faker-js/faker';
import { useAuthRedux } from '@project/shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import MaterialIcon from '../../../shared/ui/src/lib/icons/material-icon';
import { useState } from 'react';

/* eslint-disable-next-line */

// const createCardInfo = () => ({
//   id: faker.string.uuid(),
//   cardTitle: faker.person.jobTitle(),
//   cardImgUrl: faker.image.urlLoremFlickr({ category: 'sports' }),
//   description: faker.lorem.words(20),
// });
//
// const createCards = (count: number) => {
//   return Array.from({ length: count }).map(createCardInfo);
// };
//
// const MOCK_CARDS = createCards(10);

export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  const [modalActive, setModalActive] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['get-all-events'],
    queryFn: () => EventService.getAllEvents(),
  });
  console.log(data);
  return (
    <div className={styles.container}>
      <Button
        type={'button'}
        className={styles.btnAddEvent}
        onClick={() => setModalActive(true)}
      >
        <MaterialIcon name={'MdAdd'} className={styles.btnAddEvent__icon} />
      </Button>

      <Modal active={modalActive} setActive={setModalActive}>
        <CreateEventForm />
      </Modal>
      <CardList list={data?.data || []} />
    </div>
  );
}

export default HomeMain;
