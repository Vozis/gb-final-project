import { Heading } from '@project/shared/ui';
import cn from 'clsx';
import React, { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ListProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  headingClassName?: string;
}

export function List({
  children,
  className,
  title,
  headingClassName,
}: ListProps) {
  return (
    <div className={cn('', className)}>
      <Heading className={cn('mb-4', headingClassName)}>{title}</Heading>
      {/* {children} */}
      <div className="flex flex-col gap-3 items-center">{children}</div>
    </div>
  );
}

export default List;
