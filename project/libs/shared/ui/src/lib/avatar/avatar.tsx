import styles from './avatar.module.scss';
import cn from 'clsx';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useSocketState } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  imagePath: string;
  isOnline?: boolean;
  isStatusVisible?: boolean;
}

export function Avatar({
  isOnline,
  isStatusVisible = true,
  className,
  imagePath,
  style,
  ...rest
}: AvatarProps) {
  return (
    <div className={'text-center'}>
      <div className={cn(className, styles.avatarWrapper)} style={style}>
        <img
          className={cn(styles.avatarImg, {
            ['after:content-[""] after:absolute after:h-5 after:w-5 after:b-0 after:r-0 block bg-red-500 ']:
              isOnline,
          })}
          src={imagePath}
          alt={'avatar'}
        />
      </div>
      {isStatusVisible && <span>{isOnline ? 'Онлайн' : 'Не в сети'}</span>}
    </div>
  );
}

export default Avatar;
