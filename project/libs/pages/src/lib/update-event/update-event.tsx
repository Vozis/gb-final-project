import styles from './update-event.module.scss';
import { UpdateEventMain } from '@project/update-event-main';

/* eslint-disable-next-line */
export interface UpdateEventProps {}

export function UpdateEvent(props: UpdateEventProps) {
  return (
    <div className={styles['container']}>
      <UpdateEventMain />
    </div>
  );
}

export default UpdateEvent;
