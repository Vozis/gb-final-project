import styles from './button.module.scss';
import React, { HTMLAttributes } from 'react';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  disabled,
  children,
  className,
  onClick,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(styles.btn, className)}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
