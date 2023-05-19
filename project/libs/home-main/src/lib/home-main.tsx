import styles from './home-main.module.scss';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomeMain!</h1>
    </div>
  );
}

export default HomeMain;
