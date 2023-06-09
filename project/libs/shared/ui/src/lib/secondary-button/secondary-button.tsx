import styles from './secondary-button.module.scss';
import cn from 'clsx';
import React from 'react';
import { ButtonProps } from '../button/button';

/* eslint-disable-next-line */
export function SecondaryButton({
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
      {...rest}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
