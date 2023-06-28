import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface CardSkeletonProps {
  count?: number;
}

export const UserSmallSkeleton: FC<CardSkeletonProps> = ({ count = 1 }) => {
  return (
    <div
      className={
        'w-[230px] bg-white p-3 rounded-xl block flex justify-between items-center h-28 gap-2'
      }
    >
      <div>
        <SkeletonLoader
          count={1}
          className={'h-16 w-16 rounded-[100%]'}
          containerClassName={'flex gap-2 flex-wrap'}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <SkeletonLoader
          count={1}
          className={'h-5 w-28 rounded-full'}
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
