import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {}

export function Button(props: ButtonProps) {
  return (
    <button className={styles['container']}>
      <span>Welcome to Button!</span>
    </button>
  );
}

export default Button;
