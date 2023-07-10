import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';

interface NotificationEventCompleteSkeletonProps {
  count?: number;
}

export const NotificationEventSkeleton: FC<
  NotificationEventCompleteSkeletonProps
> = () => {
  return (
    <div
      className={'skeleton__bg flex flex-col rounded-xl block w-full p-3 gap-4'}
    >
      {/*<SkeletonLoader*/}
      {/*  count={1}*/}
      {/*  className={'h-6 w-64'}*/}
      {/*  containerClassName={'flex'}*/}
      {/*/>*/}
      {/*<div className={'flex items-center justify-between'}>*/}
      {/*  <SkeletonLoader*/}
      {/*    count={1}*/}
      {/*    className={'h-6 w-40'}*/}
      {/*    containerClassName={'flex justify-center'}*/}
      {/*  />*/}
      {/*  <SkeletonLoader count={1} className={'h-8 w-8 rounded-md '} />*/}
      {/*</div>*/}
      <SkeletonLoader
        count={1}
        className={'rounded-full h-8 w-8'}
        containerClassName={'flex-1 text-right'}
      />

      <SkeletonLoader
        count={1}
        className={'h-10 w-full block'}
        containerClassName={'flex'}
      />
    </div>
  );
};
