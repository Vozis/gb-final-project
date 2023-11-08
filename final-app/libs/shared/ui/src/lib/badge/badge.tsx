import styles from './badge.module.scss';
import cn from 'clsx';
import React, { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface BadgeProps extends PropsWithChildren {
  invisible?: boolean;
  max?: number;
  className?: string;
  badgeContent?: number | null;
}

export function Badge({
  invisible = false,
  max = 99,
  children,
  className,
  badgeContent,
}: BadgeProps) {
  return (
    <div className={cn(styles.badge__root, className)}>
      {children}
      <div
        className={cn(styles.badge__el, {
          [styles.badge__el_hidden]: !badgeContent,
        })}
      >
        {badgeContent}
      </div>
    </div>
  );
}

export default Badge;
