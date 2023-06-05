import styles from './single-event-main.module.scss';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SingleEventMainProps {}

export function SingleEventMain(props: SingleEventMainProps) {
  const { id } = useParams();

  return (
    <div className={styles['container']}>
      <h1>Welcome to SingleEventMain! {id}</h1>
    </div>
  );
}

export default SingleEventMain;
