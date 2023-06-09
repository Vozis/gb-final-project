import styles from './avatar.module.scss';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface AvatarProps {
  avatarUrl?: string;
  alt?: string;
  className?: string;
}

export function Avatar({ avatarUrl, alt, className }: AvatarProps) {
  return (
    <div className={clsx(styles.avatarWrapper, className)}>
      <img className={styles.avatarImg} src={avatarUrl} alt={alt} />
    </div>
  );
}

export default Avatar;
