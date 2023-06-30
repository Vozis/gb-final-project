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
        <img className={cn(styles.avatarImg)} src={imagePath} alt={'avatar'} />
        {isStatusVisible && isOnline && (
          <span
            style={{
              display: 'block',
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              border: '2px solid #F7F7F7',
              height: '14px',
              width: '14px',
              borderRadius: '50%',
              backgroundColor: 'tomato',
            }}
          ></span>
        )}
      </div>
      {/*{isStatusVisible && <span>{isOnline ? 'Онлайн' : 'Не в сети'}</span>}*/}
    </div>
  );
}

export default Avatar;
