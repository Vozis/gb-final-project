import styles from './user-card-small.module.scss';
import clsx from 'clsx';
import { IUser, IUserSingleEvent } from '@project/shared/types';
import { MaterialIcon } from '../../icons/material-icon';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { useAuthRedux } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface AvatarProps {
  userProps: IUser | IUserSingleEvent;
  className?: string;
  isPhoto?: boolean;
  isName?: boolean;
  isInfo?: boolean;
  isWhite?: boolean;
}

export function UserCardSmall({
  userProps,
  className,
  isPhoto = false,
  isName = false,
  isInfo = false,
  isWhite = false,
}: AvatarProps) {
  const { user } = useAuthRedux();

  const isProfile = user?.id === userProps.id;

  return (
    <Link
      to={isProfile ? '/profile' : `/users/${userProps.id}`}
      className={styles.container}
    >
      {isPhoto && (
        <div className={clsx(styles.avatarWrapper, className)}>
          <img
            className={styles.avatarImg}
            src={userProps?.avatarPath}
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
            className={cn(styles.fullname, {
              ['text=[#353535]']: !isWhite,
              ['text=[#ffffff]']: isWhite,
            })}
          >{`${userProps?.firstName} ${userProps?.lastName}`}</h2>
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
    </Link>
  );
}

export default UserCardSmall;
