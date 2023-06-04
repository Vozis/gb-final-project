import styles from './button.module.scss';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  className,
  onClick,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.btn, className)}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
