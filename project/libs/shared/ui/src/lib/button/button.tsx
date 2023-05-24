import styles from './button.module.scss';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  className,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(styles.btn, className)}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
