import styles from './user-big.module.scss';
import { HTMLAttributes } from 'react';
import { IUser } from '@project/shared/types';
import cn from 'clsx';
import {
  MaterialIcon,
  Avatar,
  AvatarSize,
  UserRating,
} from '@project/shared/ui';
import { useAuthRedux, useCheckUserStatus } from '@project/shared/hooks';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

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
  const { isOnline } = useCheckUserStatus(userProps.id);
  const isProfile = user?.id === userProps.id;
  console.log(user);
  return (
    <>
      <Link
        to={isProfile ? '/profile' : `/users/${userProps.id}`}
        className={styles.container}
      >
        <Avatar
          size={AvatarSize.L}
          imagePath={userProps.avatarPath}
          isOnline={isOnline}
        />
        <UserRating
          fillColor={'#FFD700'}
          SVGstyle={{ display: 'inline' }}
          size={25}
          iconsCount={1}
          initialValue={4.7}
          readonly={true}
          showTooltip
          tooltipDefaultText={'4.7'}
          tooltipClassName={styles.rating_tooltip}
        />
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
