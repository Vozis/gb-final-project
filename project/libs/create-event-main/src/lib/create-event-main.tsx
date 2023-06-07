import styles from './create-event-main.module.scss';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateEventMainProps {}

export function CreateEventMain(props: CreateEventMainProps) {
  const { id } = useParams();

  return (
    <div className={styles['container']}>
      {/*<Button*/}
      {/*  className={styles.btnAddEvent}*/}
      {/*  onClick={() => setModalActive(true)}*/}
      {/*>*/}
      {/*  <MaterialIcon name={'MdAdd'} className={styles.btnAddEvent__icon} />*/}
      {/*</Button>*/}
      {/*<Modal active={modalActive} setActive={setModalActive}>*/}
      {/*  /!*<CreateEventForm setActive={setModalActive} />*!/*/}
      {/*</Modal>*/}
    </div>
  );
}

export default CreateEventMain;
