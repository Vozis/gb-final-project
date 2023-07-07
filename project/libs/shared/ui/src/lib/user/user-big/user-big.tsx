import styles from './user-big.module.scss';
import { HTMLAttributes } from 'react';
import { IUser } from '@project/shared/types';
import cn from 'clsx';
import { Avatar, MaterialIcon, AvatarSize } from '@project/shared/ui';
import { useAuthRedux, useCheckUserStatus } from '@project/shared/hooks';
import { Link } from 'react-router-dom';

export interface UserBigProps extends HTMLAttributes<HTMLDivElement> {
  userProps: IUser;
}

export function UserBig({
  className,
  style,
  userProps,
  onClick,
}: UserBigProps) {
  const { user } = useAuthRedux();
  const { isOnline } = useCheckUserStatus(userProps.id);
  const isProfile = user?.id === userProps.id;

  return (
    <>
      <Link
        to={isProfile ? '/profile' : `/users/${userProps.id}`}
        className={styles.container}
      >
        <Avatar size={AvatarSize.L} imagePath={userProps.avatarPath} isOnline={isOnline} />
        <div className={styles.info} onClick={onClick}>
          <h2
            className={cn(styles.fullname)}
          >{`${userProps?.firstName} ${userProps?.lastName}`}</h2>

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
        </div>
      </Link>
    </>
  );
}

export default UserBig;
