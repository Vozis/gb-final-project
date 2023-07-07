import { Heading } from '@project/shared/ui';
import cn from 'clsx';
import React, { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ListProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}

export function List({ children, className, title }: ListProps) {
  return (
    <div className={cn('', className)}>
      <Heading>{title}</Heading>
      {/* {children} */}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default List;
