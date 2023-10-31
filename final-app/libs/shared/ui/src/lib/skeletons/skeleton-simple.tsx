import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader: FC<SkeletonProps> = ({
  className,
  containerClassName,
  style,
  ...rest
}) => {
  return (
    <Skeleton
      baseColor={'var(--skeleton-el-bg)'}
      highlightColor={'var(--skeleton-highlight-color)'}
      className={className}
      containerClassName={containerClassName}
      {...rest}
      style={style}
    />
  );
};
