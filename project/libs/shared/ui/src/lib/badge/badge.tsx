import styles from './badge.module.scss';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { count } from 'rxjs';

/* eslint-disable-next-line */
export interface BadgeProps extends PropsWithChildren {
  invisible?: boolean;
  max?: number;
  className?: string;
  badgeContent?: number;
}

export function Badge({
  invisible = false,
  max = 99,
  children,
  className,
  badgeContent,
}: BadgeProps) {
  if (!badgeContent) return null;
  return (
    <div className={clsx(styles.badge__root, className)}>
      {children}

      {!invisible && (
        <div className={clsx(styles.badge__el, className)}>
          <span>
            {badgeContent < max ? badgeContent : `${badgeContent - 1}+`}
          </span>
        </div>
      )}
    </div>
  );
}

//maxCount ? badgeContent : `${max - 1}+`
export default Badge;
