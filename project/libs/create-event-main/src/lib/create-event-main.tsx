import styles from './create-event-main.module.scss';
import { CreateEventForm } from '@project/home-main';

/* eslint-disable-next-line */
export interface CreateEventMainProps {}

export function CreateEventMain(props: CreateEventMainProps) {
  return (
    <div className={styles.container}>
      <CreateEventForm />
    </div>
  );
}

export default CreateEventMain;
