import React, { FC } from 'react';
import { SkeletonLoader, UserSmallSkeleton } from '@project/shared/ui';

interface CardSkeletonProps {
  count?: number;
}

export const SingleEventHeadSkeleton: FC<CardSkeletonProps> = ({
  count = 1,
}) => {
  return (
    <div
      className={
        'bg-white p-3 rounded-xl block flex justify-between h-52 gap-4'
      }
    >
      <div className={'mt-auto'}>
        <SkeletonLoader count={1} className={'h-6'} />
        <UserSmallSkeleton />
      </div>
    </div>
  );
};
