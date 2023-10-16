import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import cn from 'clsx';

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
      className={cn(
        `skeleton__bg p-3 rounded-xl block flex flex-col h-28 gap-2`,
        [classWrapper],
      )}
    >
      <div className={`flex justify-between items-center gap-3`}>
        <SkeletonLoader
          count={1}
          style={{
            height: '2rem',
          }}
          // className={'h-8'}
          containerClassName={'flex-1'}
        />
        <SkeletonLoader
          count={1}
          style={{
            height: '2rem',
            width: '2rem',
            borderRadius: '0.375rem',
          }}
          // className={'h-8 w-8 rounded-md'}
          containerClassName={'flex'}
        />
      </div>
      <div className={`flex mt-3`}>
        <SkeletonLoader
          count={2}
          style={{
            height: '2rem',
            width: '50%',
            borderRadius: '0.375rem',
          }}
          // className={'h-8 w-36 rounded-md'}
          containerClassName={'flex-1 flex gap-2'}
        />
      </div>
    </div>
  );
};
