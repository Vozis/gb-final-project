import styles from './list.module.scss';
import React, { PropsWithChildren } from 'react';
import cn from 'clsx';
import { Heading } from '@project/shared/ui';

/* eslint-disable-next-line */
export interface ListProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

export function List({ children, className, title }: ListProps) {
  return (
    <div className={cn('', className)}>
      <Heading>{title}</Heading>
      {children}
    </div>
  );
}

export default List;
