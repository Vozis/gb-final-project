import React, { FC, PropsWithChildren } from 'react';
import ContentLoader from 'react-content-loader';

export interface SkeletonLoaderProps extends PropsWithChildren<unknown> {
  width?: number;
  height?: number;
  viewBox?: string;
}

export const SkeletonLoaderCustom: FC<SkeletonLoaderProps> = ({
  height,
  width,
  viewBox,
  children,
}) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox={viewBox}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {children}
  </ContentLoader>
);
