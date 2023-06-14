import styles from './avatar.module.scss';
import clsx from 'clsx';
import { IUser, IUserSingleEvent } from '@project/shared/types';
import { MaterialIcon } from '../icons/material-icon';

/* eslint-disable-next-line */
export interface AvatarProps {
  // avatarUrl?: string;
  // alt?: string;
  user: IUser | IUserSingleEvent;
  className?: string;
  isPhoto?: boolean;
  isName?: boolean;
  isInfo?: boolean;
}

export function Avatar({
  user,
  className,
  isPhoto = false,
  isName = false,
  isInfo = false,
}: AvatarProps) {
  return (
    <div className={styles.container}>
      {isPhoto && (
        <div className={clsx(styles.avatarWrapper, className)}>
          <img
            className={styles.avatarImg}
            src={user?.avatarPath}
            alt={'avatar'}
          />
        </div>
      )}
      <div
        className={styles.info}
        onClick={() => console.log('модальное окно с информацией')}
      >
        {isName && (
          <h2
            className={styles.fullname}
          >{`${user?.firstName} ${user?.lastName}`}</h2>
        )}
        {isInfo && (
          <div className={styles.infoIconsBox}>
            <div className={styles.infoIconGroup}>
              <MaterialIcon
                name={'MdOutlineLocationOn'}
                className={styles.infoIcon}
              />
              <span>Москва</span>
            </div>
            <div className={styles.infoIconGroup}>
              <MaterialIcon
                name={'MdOutlineInfo'}
                className={styles.infoIcon}
              />
              <span>О себе</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
