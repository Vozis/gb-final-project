import styles from './title.module.scss';

/* eslint-disable-next-line */
export interface TitleProps {}

export function Title(props: TitleProps) {
  return (
    <div className={styles['container']}>
      <img src={'/assets/shared/auth-image.PNG'} className={'w-28 h-28'} />
      <h2 className={'text-2xl'}>Добро пожаловать</h2>
    </div>
  );
}

export default Title;
