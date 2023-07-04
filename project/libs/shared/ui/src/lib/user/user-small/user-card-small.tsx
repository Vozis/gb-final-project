import styles from './user-card-small.module.scss';
import { IUser, IUserSmall } from '@project/shared/types';
import { MaterialIcon } from '../../icons/material-icon';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import {
  useAuthRedux,
  useCheckUserStatus,
  useSocketState,
} from '@project/shared/hooks';
import Avatar from '../../avatar/avatar';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface UserCardSmallProps {
  userProps: IUser | IUserSmall;
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
}: UserCardSmallProps) {
  const { user } = useAuthRedux();

  const { isOnline } = useCheckUserStatus(userProps.id);

  const isProfile = user?.id === userProps.id;

  // console.log(`user ${userProps.firstName} ${isOnline}`);

  return (
    <Link
      to={isProfile ? '/profile' : `/users/${userProps.id}`}
      className={styles.container}
    >
      {isPhoto && (
        <Avatar imagePath={userProps.avatarPath} isOnline={isOnline} />
      )}
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
            <MaterialIcon name={'MdOutlineInfo'} className={styles.infoIcon} />
            <span>О себе</span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default UserCardSmall;
