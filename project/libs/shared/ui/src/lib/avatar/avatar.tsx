import styles from './avatar.module.scss';
import cn from 'clsx';
import { HTMLAttributes } from 'react';

/* eslint-disable-next-line */
export enum AvatarSize {
  M = 'size_m',
  L = 'size_l',
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  imagePath: string;
  isOnline?: boolean;
  isStatusVisible?: boolean;
  size?: AvatarSize;
}

export function Avatar({
  isOnline,
  isStatusVisible = true,
  className,
  imagePath,
  style,
  size = AvatarSize.M,
  ...rest
}: AvatarProps) {
  return (
    <div className={'text-center'}>
      <div
        className={cn(className, styles.avatarWrapper, {
          [styles[size]]: true,
        })}
        style={style}
      >
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
