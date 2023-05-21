import styles from './title.module.scss';

/* eslint-disable-next-line */
export interface TitleProps {}

export function Title(props: TitleProps) {
  return (
    <div className={styles['container']}>
      <h2>Welcome!</h2>
      <p className={styles.title}>Please login or regist.</p>
    </div>
  );
}

export default Title;
