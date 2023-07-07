import styles from './update-event-main.module.scss';
import UpdateEventForm from './update-event-form/update-event-form';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface UpdateEventMainProps {}

export function UpdateEventMain(props: UpdateEventMainProps) {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className={styles['container']}>
      <UpdateEventForm eventId={id} />
    </div>
  );
}

export default UpdateEventMain;
