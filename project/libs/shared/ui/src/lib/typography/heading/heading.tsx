/* eslint-disable-next-line */
import React, { FC, PropsWithChildren } from 'react';
import cn from 'clsx';

export const Heading: FC<
  PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className, style }) => {
  return (
    <h2 className={cn('text-2xl font-semibold', className)}>{children}</h2>
  );
};

export default Heading;
