import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import cn from 'clsx';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <Skeleton
      {...rest}
      baseColor={'#F7F7F7'}
      highlightColor={'#f1f1f1'}
      className={cn('rounded-md', className)}
    />
  );
};
