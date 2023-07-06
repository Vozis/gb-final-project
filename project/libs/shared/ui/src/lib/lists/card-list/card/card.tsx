import { useAuthRedux, useModal } from '@project/shared/hooks';
import { IEventForCard } from '@project/shared/types';
import {
  Button,
  FavoriteButton,
  MaterialIcon,
  ModalScreen,
  Tag,
  ToggleUserButton,
} from '@project/shared/ui';
import clsx from 'clsx';
import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import styles from './card.module.scss';
import ModalAnchor from '../../../modals/modal-anchor/modal-anchor';
import { FaEllipsis } from 'react-icons/fa6';

/* eslint-disable-next-line */
export interface CardProps {
  event: IEventForCard;
}

export const Card: FC<CardProps> = ({ event }) => {
  const { user } = useAuthRedux();
  // const [isShowSettingModal, handleToggleSettingModal] = useModal(false);
  // const modalHeight = useRef<HTMLDivElement>(null);
  // const anchorRef = useRef<Array<HTMLButtonElement | null>>([]);
  // const [height, setHeight] = useState('0px');
  // const [top, setTop] = useState('0px');
  // const [right, setRight] = useState('0px');

  if (!user) {
    redirect('/auth');
  }

  // useEffect(() => {
  //   if (anchorRef.current[event.id]) {
  //     console.log(window.innerHeight, window.innerWidth);
  //     console.log(
  //       'anchor params: ',
  //       // @ts-ignore
  //       anchorRef?.current[event.id].getBoundingClientRect(),
  //     );
  //   }
  //   if (modalHeight.current && anchorRef.current) {
  //     const screenWidth = window.innerWidth;
  //     // @ts-ignore
  //     const anchorParams = anchorRef?.current[event.id].getBoundingClientRect();
  //     setHeight(
  //       isShowSettingModal ? `${modalHeight.current.scrollHeight}px` : '0px',
  //     );
  //     setTop(
  //       isShowSettingModal
  //         ? `${
  //             //
  //             anchorRef?.current[event.id].getBoundingClientRect().y +
  //             // @ts-ignore
  //             anchorRef?.current[event.id].getBoundingClientRect().width +
  //             20
  //           }px`
  //         : '0px',
  //     );
  //     setRight(
  //       isShowSettingModal ? `${screenWidth - anchorParams.right}px` : '0px',
  //     );
  //   }
  // }, [isShowSettingModal]);

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
        <>
          <FavoriteButton
            className={'absolute right-0 top-0'}
            eventId={event.id}
          />
          {user.id === event.creator?.id && (
            <>
              {/*<button*/}
              {/*  ref={el => (anchorRef.current[event.id] = el)}*/}
              {/*  type="button"*/}
              {/*  onClick={handleToggleSettingModal}*/}
              {/*>*/}
              {/*  <FaEllipsis className={'text-3xl text-white'} />*/}
              {/*</button>*/}
              {/*<ModalAnchor*/}
              {/*  className={'z-30'}*/}
              {/*  show={isShowSettingModal}*/}
              {/*  onCloseClick={handleToggleSettingModal}*/}
              {/*  ref={modalHeight}*/}
              {/*  height={height}*/}
              {/*  top={top}*/}
              {/*  right={right}*/}
              {/*>*/}
              {/*  <Link*/}
              {/*    to={'/profile/update'}*/}
              {/*    className={styles.profile__settingsList_item}*/}
              {/*  >*/}
              {/*    <MaterialIcon*/}
              {/*      name={'MdOutlineEdit'}*/}
              {/*      className={styles.profile__settingsList_item_icon}*/}
              {/*    />*/}
              {/*    <span>Редактировать профиль</span>*/}
              {/*  </Link>*/}

              {/*  <Link to={'/'} className={styles.profile__settingsList_item}>*/}
              {/*    <MaterialIcon*/}
              {/*      name={'MdArrowOutward'}*/}
              {/*      className={styles.profile__settingsList_item_icon}*/}
              {/*    />*/}
              {/*    <span>Поделиться профилем</span>*/}
              {/*  </Link>*/}
              {/*</ModalAnchor>*/}
              <Link
                to={`/events/update/${event.id}`}
                className={'absolute right-8 top-12'}
              >
                <FaEllipsis className={'text-3xl text-white'} />
              </Link>

              {/*<Button className={'text-white'}>Удалить</Button>*/}
            </>
          )}
        </>
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
