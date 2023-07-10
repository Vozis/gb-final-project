import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import clsx from 'clsx';

interface FilterSkeletonProps {
  count?: number;
  classWrapper?: string;
}

export const FilterSkeleton: FC<FilterSkeletonProps> = ({
  count = 1,
  classWrapper,
}) => {
  return (
    <div
      className={clsx(
        `skeleton__bg p-3 rounded-xl block flex flex-col h-28 gap-2`,
        [classWrapper],
      )}
    >
      <div className={`flex justify-between items-center gap-3`}>
        <SkeletonLoader
          count={1}
          className={'h-8'}
          containerClassName={'flex-1'}
        />
        <SkeletonLoader
          count={1}
          className={'h-8 w-8 rounded-md'}
          containerClassName={'flex'}
        />
      </div>
      <div className={`flex mt-3`}>
        <SkeletonLoader
          count={2}
          className={'h-8 w-36 rounded-md'}
          containerClassName={'flex gap-2'}
        />
      </div>
    </div>
  );
};
