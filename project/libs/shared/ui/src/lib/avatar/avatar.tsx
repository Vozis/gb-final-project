import styles from './avatar.module.scss';

/* eslint-disable-next-line */
export interface AvatarProps {}

export function Avatar(props: AvatarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Avatar!</h1>
    </div>
  );
}

export default Avatar;
