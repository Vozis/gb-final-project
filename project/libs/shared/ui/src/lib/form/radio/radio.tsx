import styles from './radio.module.scss';
import { forwardRef, InputHTMLAttributes } from 'react';

/* eslint-disable-next-line */
export interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const RadioField = forwardRef<HTMLInputElement, IRadio>(
  ({ className, defaultChecked, name, value, label, style, ...rest }, ref) => {
    return (
      <label className={styles.label}>
        <input
          className={styles.hidden}
          type={'radio'}
          ref={ref}
          value={value}
          name={name}
          {...rest}
          defaultChecked={defaultChecked}
        />
        <span className={styles.value}>{label}</span>
      </label>
    );
  },
);

RadioField.displayName = 'RadioField';
