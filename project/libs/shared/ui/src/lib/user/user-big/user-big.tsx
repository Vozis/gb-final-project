import styles from './user-big.module.scss';
import { HTMLAttributes } from 'react';
import { IUser } from '@project/shared/types';
import clsx from 'clsx';
import cn from 'clsx';
import { MaterialIcon } from '../../icons/material-icon';
import { useAuthRedux, useModal } from '@project/shared/hooks';
import { Link } from 'react-router-dom';
// import { Modal } from '@project/shared/ui';

/* eslint-disable-next-line */
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
  const isProfile = user?.id === userProps.id;

  return (
    <>
      <Link
        to={isProfile ? '/profile' : `/users/${userProps.id}`}
        className={styles.container}
      >
        <div className={clsx(styles.avatarWrapper, className)}>
          <img
            className={styles.avatarImg}
            src={userProps?.avatarPath}
            alt={'avatar'}
          />
        </div>
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
