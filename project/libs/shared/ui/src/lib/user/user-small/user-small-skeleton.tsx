import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import clsx from 'clsx';
import { fakerFA } from '@faker-js/faker';

interface CardSkeletonProps {
  count?: number;
  classWrapper?: string;
  isPhoto?: boolean;
  isInfo?: boolean;
  hasBtn?: boolean;
}

export const UserSmallSkeleton: FC<CardSkeletonProps> = ({
  count = 1,
  classWrapper,
  isPhoto = true,
  isInfo = true,
  hasBtn = false,
}) => {
  return (
    <div
      className={clsx(
        'skeleton__bg p-3 rounded-xl block flex items-center h-28 gap-2',
        [classWrapper],
      )}
    >
      <div>
        {isPhoto && (
          <SkeletonLoader
            count={1}
            className={'h-16 w-16 rounded-full'}
            containerClassName={'flex gap-2 flex-wrap'}
          />
        )}
      </div>
      {isInfo && (
        <div className={'flex flex-col gap-2'}>
          <SkeletonLoader
            count={1}
            className={'h-5 w-64 rounded-full'}
            containerClassName={'flex gap-2 flex-wrap'}
          />
          <SkeletonLoader
            count={2}
            className={'h-5 w-16 rounded-full'}
            containerClassName={'flex gap-2'}
          />
        </div>
      )}
      {hasBtn && (
        <SkeletonLoader
          count={1}
          className={'h-8 w-8 rounded-md'}
          containerClassName={'flex ml-auto'}
        />
      )}
    </div>
  );
};
