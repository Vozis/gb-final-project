import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import cn from 'clsx';

interface FriendsListSkeletonProps {
  count?: number;
  classWrapper?: string;
}

export const FriendsListSkeleton: FC<FriendsListSkeletonProps> = ({
  count = 1,
  classWrapper,
}) => {
  return (
    <div
      className={cn(
        'skeleton__bg px-5 py-4 rounded-xl flex flex-col items-start gap-2 relative overflow-hidden',
        [classWrapper],
      )}
    >
      <SkeletonLoader
        count={1}
        style={{
          height: '2rem',
          width: '10rem',
          marginBottom: '0.75rem',
          borderRadius: '0.375rem',
        }}
        // className={'h-8 w-40 mb-3 rounded-md '}
        containerClassName={'flex gap-2 flex-wrap'}
      />
      <div className={'flex  items-center gap-2'}>
        <SkeletonLoader
          count={count}
          style={{
            height: '4.5rem',
            width: '4.5rem',
            borderRadius: '100%',
          }}
          // className={'h-20 w-20 rounded-full'}
          containerClassName={'flex-1 flex gap-2'}
        />
      </div>
    </div>
  );
};
