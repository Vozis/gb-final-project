import React, { FC } from 'react';
import { SkeletonLoader } from '@project/shared/ui';
import cn from 'clsx';

interface CardSkeletonProps {
  count?: number;
  classWrapper?: string;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({
  count = 1,
  classWrapper,
}) => {
  return (
    <div className={cn('flex gap-6', [classWrapper])}>
      {[...Array(count).keys()].map(item => (
        <div
          key={item}
          className={cn(
            'skeleton__bg p-3 rounded-xl block flex flex-col justify-between h-52 gap-4',
          )}
        >
          <div className={'flex justify-between'}>
            <SkeletonLoader
              count={1}
              style={{
                height: '1.25rem',
              }}
              // className={'h-5'}
              containerClassName={'flex-1'}
            />
            <SkeletonLoader
              count={1}
              style={{
                borderRadius: '50px',
                height: '2rem',
                width: '2rem',
              }}
              // className={'rounded-full h-8 w-8'}
              containerClassName={'flex-1 text-right'}
            />
          </div>
          <div>
            <SkeletonLoader
              count={4}
              style={{
                borderRadius: '50px',
                height: '1.5rem',
                width: '6rem',
              }}
              // className={'h-6 w-24 rounded-[50px]'}
              containerClassName={'flex gap-2 flex-wrap'}
            />
            <SkeletonLoader
              count={1}
              style={{
                height: '2rem',
                marginTop: '0.75rem',
                borderRadius: '50px',
              }}
              // className={'h-8 mt-3 rounded-[50px]'}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
