import styles from './sub-heading.module.scss';

/* eslint-disable-next-line */
import React, { FC, PropsWithChildren } from 'react';
import cn from 'clsx';

export const SubHeading: FC<
  PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className, style }) => {
  return <h3 className={cn('text-xl font-medium', className)}>{children}</h3>;
};

export default SubHeading;
