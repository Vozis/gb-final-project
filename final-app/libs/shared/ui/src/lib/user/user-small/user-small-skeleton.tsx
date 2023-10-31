import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import cn from 'clsx';

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
      className={cn(
        classWrapper,
        'skeleton__bg p-3 rounded-xl block flex items-center h-28 gap-2 relative',
      )}
    >
      <div>
        {isPhoto && (
          <SkeletonLoader
            count={1}
            style={{
              height: '4rem',
              width: '4rem',
              borderRadius: '50px',
            }}
            // className={'h-16 w-16 rounded-full'}
            containerClassName={'flex gap-2 flex-wrap'}
          />
        )}
      </div>
      {isInfo && (
        <div className={'mt-12 flex flex-col gap-2'}>
          <SkeletonLoader
            count={1}
            style={{
              height: '1.25rem',
              width: '10rem',
              borderRadius: '50px',
            }}
            // className={'h-5 w-64 rounded-full'}
            containerClassName={'flex gap-2 flex-wrap'}
          />
          <SkeletonLoader
            count={2}
            style={{
              height: '1.25rem',
              width: '4rem',
              borderRadius: '50px',
            }}
            // className={'h-5 w-16 rounded-full'}
            containerClassName={'flex gap-2'}
          />
        </div>
      )}
      {hasBtn && (
        <SkeletonLoader
          count={1}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            height: '2rem',
            width: '2rem',
            // borderRadius: '0.375rem',
          }}
          // className={'h-8 w-8 rounded-md'}
          // containerClassName={'flex ml-auto'}
        />
      )}
    </div>
  );
};
