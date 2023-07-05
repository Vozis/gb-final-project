import { useAuthRedux, useModal } from '@project/shared/hooks';
import { IEventForCard } from '@project/shared/types';
import {
  Button,
  FavoriteButton,
  MaterialIcon,
  ModalWindow,
  Tag,
  ToggleUserButton,
} from '@project/shared/ui';
import clsx from 'clsx';
import moment from 'moment';
import { FC, useRef, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import styles from './card.module.scss';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEventForCard;
}

export const Card: FC<CardProps> = ({ event }) => {
  // const queryClient = useQueryClient();
  const { user } = useAuthRedux();
  const [isShowSettingModal, handleToggleSettingModal] = useModal(false);
  const modalHeight = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  if (!user) {
    redirect('/auth');
  }

  // console.log('event: ', event);

  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${event.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user && (
        <div className={'absolute right-2 top-2 text-right'}>
          <FavoriteButton eventId={event.id} />
          {user.id === event.creator?.id && (
            <>
              <Link
                to={`/events/update/${event.id}`}
                className={'text-white block'}
              >
                Редактировать
              </Link>
              <Button className={'text-white'}>Удалить</Button>
            </>
          )}
          {/*<div>*/}
          {/*  <button type="button" onClick={handleToggleSettingModal}>*/}
          {/*    <MaterialIcon*/}
          {/*      name={'MdSettings'}*/}
          {/*      className={'text-gray-400 text-3xl'}*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*  <ModalWindow*/}
          {/*    isSettingModal*/}
          {/*    show={isShowSettingModal}*/}
          {/*    onCloseClick={handleToggleSettingModal}*/}
          {/*    ref={modalHeight}*/}
          {/*    height={height}*/}
          {/*  >*/}
          {/*    <ul className={styles.profile__settingsList}>*/}
          {/*      <li>*/}
          {/*        <Link*/}
          {/*          to={'/profile/update'}*/}
          {/*          className={styles.profile__settingsList_item}*/}
          {/*        >*/}
          {/*          <MaterialIcon*/}
          {/*            name={'MdOutlineEdit'}*/}
          {/*            className={styles.profile__settingsList_item_icon}*/}
          {/*          />*/}
          {/*          <span>Редактировать профиль</span>*/}
          {/*        </Link>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <Link to={'/'} className={styles.profile__settingsList_item}>*/}
          {/*          <MaterialIcon*/}
          {/*            name={'MdArrowOutward'}*/}
          {/*            className={styles.profile__settingsList_item_icon}*/}
          {/*          />*/}
          {/*          <span>Поделиться профилем</span>*/}
          {/*        </Link>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </ModalWindow>*/}
          {/*</div>*/}
        </div>
      )}
      <div className={styles.card__info}>
        <Link to={`/events/${event.id}`} className={styles.card__title}>
          {event.name}
        </Link>
        {event._count.users && (
          <p className={'text-white'}>
            {event._count.users < event.peopleCount &&
              `осталось ${event.peopleCount - event._count.users} мест`}
            {event._count.users === event.peopleCount && `нет мест`}
          </p>
        )}
        <p className={'text-white'}>
          {moment(event.eventTime).format('MMMM Do YYYY, h:mm a')}
        </p>
        <div className={styles.card__tags}>
          {event.tags.map(tag => (
            <Tag
              key={tag.id}
              className={clsx({
                'bg-red-300 hover:bg-red-400': tag?.type?.name === 'count',
                [styles.card__tag_place]: tag?.type?.name === 'place',
                'bg-green-300 hover:bg-green-400': tag?.type?.name === 'city',
                'bg-cyan-300 hover:bg-cyan-400': tag?.type?.name === 'sport',
              })}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
        {user && <ToggleUserButton event={event} />}
      </div>
    </div>
  );
};

export default Card;
