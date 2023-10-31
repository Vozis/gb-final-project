import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface NotificationEventCompleteSkeletonProps {
  count?: number;
}

export const NotificationEventCompleteSkeleton: FC<
  NotificationEventCompleteSkeletonProps
> = () => {
  return (
    <div
      className={'skeleton__bg flex flex-col rounded-xl block w-full p-3 gap-4'}
    >
      <SkeletonLoader
        count={1}
        style={{
          height: '1.5rem',
          width: '16rem',
        }}
        // className={'h-6 w-64'}
        containerClassName={'flex'}
      />
      <div className={'flex items-center justify-between'}>
        <SkeletonLoader
          count={1}
          style={{
            height: '1.5rem',
            width: '10rem',
          }}
          // className={'h-6 w-40'}
          containerClassName={'flex justify-center'}
        />
        <SkeletonLoader
          count={1}
          style={{
            height: '2rem',
            width: '2rem',
            borderRadius: '0.375rem',
          }}
          // className={'h-8 w-8 rounded-md '}
        />
      </div>

      <SkeletonLoader
        count={1}
        style={{
          height: '2.5rem',
          width: '100%',
          display: 'block',
        }}
        // className={'h-10 w-full block'}
        containerClassName={'flex'}
      />
      {/*<SkeletonLoader*/}
      {/*  count={1}*/}
      {/*  className={'rounded-full h-8 w-8'}*/}
      {/*  containerClassName={'flex-1 text-right'}*/}
      {/*/>*/}
    </div>
  );
};
