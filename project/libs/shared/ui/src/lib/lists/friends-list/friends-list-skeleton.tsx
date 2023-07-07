import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface FriendsListSkeletonProps {
  count?: number;
}

export const FriendsListSkeleton: FC<FriendsListSkeletonProps> = ({
  count = 1,
}) => {
  return (
    <div
      className={
        'm-auto w-full bg-white px-5 py-4 rounded-xl flex flex-col items-start gap-2 relative overflow-hidden'
      }
    >
      <SkeletonLoader
        count={1}
        className={'h-8 w-40 mb-3 rounded-md '}
        containerClassName={'flex gap-2 flex-wrap'}
      />
      <div className={'flex  items-center gap-2'}>
        <SkeletonLoader
          count={count}
          className={'h-20 w-20 rounded-full'}
          containerClassName={'flex  gap-2 '}
        />
      </div>
    </div>
  );
};
