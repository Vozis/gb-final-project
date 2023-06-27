import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface CardSkeletonProps {
  count?: number;
}

export const UserBigSkeleton: FC<CardSkeletonProps> = ({ count = 1 }) => {
  return (
    <div
      className={
        'm-auto w-[300px] bg-white p-3 rounded-xl flex flex-col justify-between items-center gap-2 relative'
      }
    >
      <div>
        <SkeletonLoader
          count={1}
          className={'h-16 w-16 rounded-[100%]'}
          containerClassName={'flex gap-2 flex-wrap'}
        />
        <SkeletonLoader
          count={1}
          className={'h-8 w-8 rounded-full absolute right-3 top-3'}
        />
      </div>
      <div className={'flex flex-col items-center gap-2'}>
        <SkeletonLoader
          count={1}
          className={'h-5 w-40 rounded-full'}
          containerClassName={'flex gap-2 flex-wrap'}
        />
        <SkeletonLoader
          count={2}
          className={'h-5 w-12 rounded-full'}
          containerClassName={'flex gap-2'}
        />
      </div>
    </div>
  );
};
