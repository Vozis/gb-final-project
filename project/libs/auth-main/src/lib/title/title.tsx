import styles from './title.module.scss';

/* eslint-disable-next-line */
export interface TitleProps {}

export function Title(props: TitleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Title!</h1>
    </div>
  );
}

export default Title;
