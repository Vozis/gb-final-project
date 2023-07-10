import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import clsx from 'clsx';

interface CardSkeletonProps {
  count?: number;
  classWrapper?: string;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({
  count = 1,
  classWrapper,
}) => {
  return (
    <div className={clsx('flex gap-6', [classWrapper])}>
      {[...Array(count).keys()].map(item => (
        <div
          key={item}
          className={clsx(
            'skeleton__bg p-3 rounded-xl block flex flex-col justify-between h-52 gap-4',
          )}
        >
          <div className={'flex justify-between'}>
            <SkeletonLoader
              count={1}
              className={'h-5'}
              containerClassName={'flex-1'}
            />
            <SkeletonLoader
              count={1}
              className={'rounded-full h-8 w-8'}
              containerClassName={'flex-1 text-right'}
            />
          </div>
          <div>
            <SkeletonLoader
              count={4}
              className={'h-6 w-24 rounded-[50px]'}
              containerClassName={'flex gap-2 flex-wrap'}
            />
            <SkeletonLoader count={1} className={'h-8 mt-3 rounded-[50px]'} />
          </div>
        </div>
      ))}
    </div>
  );
};
