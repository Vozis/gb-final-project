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
          <span className={styles.isOnline}></span>
        )}
      </div>
      {/*{isStatusVisible && <span>{isOnline ? 'Онлайн' : 'Не в сети'}</span>}*/}
    </div>
  );
}

export default Avatar;
