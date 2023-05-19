import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {}

export function Button(props: ButtonProps) {
  return (
    <button className={styles['container']}>
      <h1>Welcome to Button!</h1>
    </button>
  );
}

export default Button;
