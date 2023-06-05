import styles from './create-event-main.module.scss';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateEventMainProps {}

export function CreateEventMain(props: CreateEventMainProps) {
  const { id } = useParams();

  return (
    <div className={styles['container']}>
      <h1>Welcome to CreateEventMain! {id}</h1>
    </div>
  );
}

export default CreateEventMain;
