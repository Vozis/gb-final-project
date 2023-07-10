import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import cn from 'clsx';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <Skeleton
      {...rest}
      baseColor={'var(--skeleton-el-bg)'}
      highlightColor={'var(--skeleton-highlight-color)'}
      className={cn('rounded-full', className)}
    />
  );
};
