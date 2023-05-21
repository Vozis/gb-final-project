import styles from './home-main.module.scss';
import Card from './card/card';

/* eslint-disable-next-line */
export interface HomeMainProps {}

export function HomeMain(props: HomeMainProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to HomeMain!</h1>
      <div>
        <h2 className={styles.title}>Title</h2>
        <p className={styles.desc}></p>
      </div>
      <Card />
    </div>
  );
}

export default HomeMain;
