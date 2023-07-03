import styles from './friends-list.module.scss';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import React, { useEffect, useRef } from 'react';
import UserCardSmall from '../../user/user-small/user-card-small';
import { IUser, IUserSmall } from '@project/shared/types';
import { faker } from '@faker-js/faker';

import { register } from 'swiper/element/bundle';
import { Heading } from '@project/shared/ui';

register();

/* eslint-disable-next-line */
export interface FriendsListProps {
  user: IUser;
}

const getFriendsList = (count: number) => {
  return Array(count)
    .fill(true)
    .map(_ => {
      return {
        id: faker.string.nanoid(),
        firstName: faker.person.firstName(),
        lastname: faker.person.lastName(),
        avatarUrl: faker.image.avatar(),
      };
    });
};
const friends = getFriendsList(10);

// console.log('friends: ', friends);

export function FriendsList({ user }: FriendsListProps) {
  console.log('friends: ', user.friends);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const nextBtn = swiperContainer?.swiper.navigation.nextEl;

    console.log(swiperContainer?.swiper);
  }, []);

  return (
    <>
      <Heading>Список друзей</Heading>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
      >
        {user &&
          user.friends?.length &&
          user.friends.map(friend => (
            <SwiperSlide key={friend.id}>
              <UserCardSmall userProps={friend} isPhoto={true} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default FriendsList;
