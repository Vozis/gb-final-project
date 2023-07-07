import React, { useEffect, useRef } from 'react';
import styles from './friends-list.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { Heading, MaterialIcon, UserCardSmall } from '@project/shared/ui';

import { IUserSmall } from '@project/shared/types';
import clsx from 'clsx';

/* eslint-disable-next-line */
export interface FriendsListProps {
  list?: IUserSmall[];
  arrows?: boolean;
  loop?: boolean;
  className?: string;
  slidesPerView?: number | 'auto';
  breakPoints?: { [p: number]: SwiperOptions };
  injectStyles?: string[];
}

export function FriendsList({
  list,
  arrows,
  loop,
  className,
  slidesPerView,
  breakPoints,
}: FriendsListProps) {
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prevArrowRef.current && nextArrowRef.current) {
      const disabled: boolean =
        prevArrowRef.current.hasAttribute('disabled') ||
        nextArrowRef.current.hasAttribute('disabled');

      console.log(disabled);
    }
  }, []);
  //

  const onBeforeInit = (Swiper: SwiperCore): void => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation;
      if (navigation !== undefined) {
        navigation.prevEl = prevArrowRef?.current;
        navigation.nextEl = nextArrowRef?.current;
      }
    }
  };
  console.log(prevArrowRef.current);
  return (
    <div className={styles.friends__list}>
      <Heading className={styles.title}>Список друзей</Heading>
      <Swiper
        onBeforeInit={onBeforeInit}
        modules={[Navigation]}
        loop={loop}
        slidesPerView={slidesPerView}
        breakpoints={breakPoints}
      >
        {list?.length
          ? list.map(friend => (
              <SwiperSlide key={friend.id} style={{ width: '90px' }}>
                <UserCardSmall userProps={friend} isPhoto />
              </SwiperSlide>
            ))
          : 'нет друзей'}
        {arrows && (
          <>
            <button
              className={clsx(styles.Slider__btn, styles.Slider__btn_left, {
                // [styles.Slider__btn_disabled]: disabled,
              })}
              ref={prevArrowRef}
            >
              <MaterialIcon
                name={'MdKeyboardArrowLeft'}
                className={'slider__btn_icon'}
              />
            </button>
            <button
              className={clsx(styles.Slider__btn, styles.Slider__btn_right)}
              ref={nextArrowRef}
            >
              <MaterialIcon name={'MdKeyboardArrowRight'} />
            </button>
          </>
        )}
      </Swiper>
    </div>
  );
}

export default FriendsList;
