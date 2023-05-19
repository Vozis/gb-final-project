import styles from './input.module.scss';

/* eslint-disable-next-line */
export interface InputProps {}

export function Input(props: InputProps) {
  return (
    <label>
      <span>input</span>
      <input />
    </label>
  );
}

export default Input;
