import { useAuthRedux } from '@project/shared/hooks';
import { IEventForCard, IEventStatus } from '@project/shared/types';
import { FavoriteButton, Tag, ToggleUserButton } from '@project/shared/ui';
import cn from 'clsx';
import moment from 'moment';
import 'moment/locale/ru.js';
import { FC } from 'react';
import { Link, redirect } from 'react-router-dom';
import styles from './card.module.scss';
import { FaEllipsis } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

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
  function declOfNum(number: number, words: string[]) {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  }

  const wordsArr: string[] = ['место', 'места', 'мест'];

  // console.log(user?.favorites);

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
            id={`favBtn-${event.id}`}
          />
          <Tooltip
            style={{ backgroundColor: '#54B4D3', color: '#fff' }}
            anchorSelect={`[id^='favBtn-${event.id}']`}
            content={`${
              user.favorites?.some(item => item.id === event.id)
                ? 'Удалить из избранного'
                : 'Добавить в избранное'
            }`}
          />
          {user.id === event.creator?.id && (
            <>
              <Link
                to={`/events/update/${event.id}`}
                className={'absolute right-8 top-12'}
                id={`card-${event.id}`}
              >
                <FaEllipsis className={'text-3xl text-white'} />
                <Tooltip
                  style={{ backgroundColor: '#54B4D3', color: '#fff' }}
                  place={'right'}
                  anchorSelect="[id^='card-']"
                  content={'Редактирование события'}
                />
              </Link>
            </>
          )}
        </>
      )}
      <div className={styles.card__info}>
        <div className={styles.cardHeader}>
          <Link to={`/events/${event.id}`} className={styles.card__title}>
            {event.name.length > 18
              ? `${event.name?.substring(0, 22)}...`
              : event.name}
          </Link>
          <p
            className={cn(styles.countInfo, {
              hidden: event.status === 'CLOSED',
              ['!bg-[#ff3347]']: event._count.users === event.peopleCount,
            })}
          >
            {event.status !== 'CLOSED' &&
              event._count.users < event.peopleCount &&
              `осталось ${event.peopleCount - event._count.users} ${declOfNum(
                event.peopleCount - event._count.users,
                wordsArr,
              )}`}
            {event._count.users === event.peopleCount && `нет мест`}
          </p>
        </div>
        <span className={`${styles.cardDate} text-white`}>
          Дата: {moment(event.eventTime).format('DD.MM.YYYY LT')}
        </span>
        <div className={styles.card__tags}>
          {event.tags.map(tag => (
            <Tag
              key={tag.id}
              className={cn({
                'bg-red-300 hover:bg-red-400': tag?.type?.name === 'time',
                [styles.card__tag_place]: tag?.type?.name === 'place',
                'bg-green-300 hover:bg-green-400': tag?.type?.name === 'city',
                'bg-cyan-300 hover:bg-cyan-400': tag?.type?.name === 'sport',
              })}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
        {event.status !== IEventStatus.OPEN && (
          <p
            className={
              'text-white text-center font-semibold px-4 py-2 border border-2 rounded-full border-white'
            }
          >
            {event.status}
          </p>
        )}
        {user && event.status !== IEventStatus.CLOSED && (
          <ToggleUserButton event={event} />
        )}
      </div>
    </div>
  );
};

export default Card;
