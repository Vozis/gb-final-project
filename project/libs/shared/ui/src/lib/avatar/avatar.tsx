import styles from './avatar.module.scss';


/* eslint-disable-next-line */
export interface AvatarProps {
  avatarUrl?: string
}

export function Avatar( { avatarUrl }:AvatarProps) {
  return (
    <div className={styles.avatarWrapper}>
      <img className={styles.avatarImg} src={ avatarUrl } alt=""/>
    </div>
  );
}

export default Avatar;
