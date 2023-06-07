import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import cn from 'clsx';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <Skeleton
      {...rest}
      baseColor={'#1F2024'}
      highlightColor={'#272C33'}
      className={cn('rounded-lg', className)}
    />
  );
};
