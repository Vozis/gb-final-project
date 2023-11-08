import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface CardSkeletonProps {
  count?: number;
}

export const UserBigSkeleton: FC<CardSkeletonProps> = ({ count = 1 }) => {
  return (
    <div
      className={`skeleton__bg m-auto w-full p-3 rounded-xl flex flex-col justify-between items-center gap-2 relative`}
    >
      <div>
        <SkeletonLoader
          count={1}
          style={{
            borderRadius: '50px',
            width: '5rem',
            height: '5rem',
          }}
          // className={'min-w-20 basis-20 h-20 w-20 rounded-full'}
          // containerClassName={'flex'}
        />
        <SkeletonLoader
          count={1}
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '0.75rem',
            height: '2rem',
            width: '2rem',
          }}
          // className={'h-8 w-8 rounded-md absolute right-3 top-3'}
        />
      </div>
      <div className={'flex flex-col items-center gap-2'}>
        <SkeletonLoader
          count={1}
          style={{
            height: '1.25rem',
            width: '10rem',
            borderRadius: '50px',
          }}
          // className={'h-5 w-40 rounded-full flex-1'}
          // containerClassName={'flex-1'}
        />
        <SkeletonLoader
          count={2}
          style={{
            height: '1.25rem',
            width: '3rem',
            borderRadius: '50px',
          }}
          // className={'h-5 w-12 rounded-full'}
          containerClassName={'flex flex-1 gap-2'}
        />
      </div>
    </div>
  );
};
