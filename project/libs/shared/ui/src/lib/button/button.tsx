import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button className={styles['container']} onClick={props.onClick}>
      <span>{props.text}</span>
    </button>
  );
}

export default Button;
