import { INotification, ISetRating } from '@project/shared/types';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EventService, RatingService } from '@project/shared/services';
import styles from './notification-event-complete.module.scss';
import { Rating } from 'react-simple-star-rating';
import { Accordion, Avatar, Button } from '@project/shared/ui';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { errorCatch } from '@project/shared/utils';

/* eslint-disable-next-line */
export interface NotificationsEventsCompleteProps {
  data: INotification;
}

export function NotificationEventComplete({
  data: notification,
}: NotificationsEventsCompleteProps) {
  const queryClient = useQueryClient();
  const [showRating, setShowRating] = useState<boolean>(true);
  const [isSended, setIsSended] = useState<boolean>(true);

  // const data = queryClient.ensureQueryData(
  //   ['get-single-event', notification.sourceId],
  //   () => EventService.getSingleEvent(String(notification.sourceId)),
  // );

  const { data: completeEvent } = useQuery(
    ['get-single-event', notification.sourceId],
    () => EventService.getSingleEvent(String(notification.sourceId)),
    { select: ({ data }) => data },
  );

  // const { refetch, isLoading } = useQuery(
  //   ['author-movie-rating', movieId],
  //   () => RatingService.getByUserMovie(movieId),
  //   {
  //     onSuccess: ({ data }) => {
  //       setRating(data);
  //     },
  //     onError: error => {
  //       toastError(error, 'Get rating');
  //     },
  //     enabled: !!movieId && !!user,
  //   },
  // );

  // useEffect(() => {
  //   if (completeEvent) {
  //     completeEvent.users.forEach(user => {
  //
  //     })
  //   }
  // }, [completeEvent]);

  const { mutateAsync } = useMutation(
    ['set-rating-movie'],
    (data: ISetRating) => RatingService.setRating(data),
    {
      onMutate: () => {
        toast('Загрузка...', {
          id: 'set-rating-movie',
        });
      },
      onError: error => {
        toast.error(errorCatch(error), {
          id: 'set-rating-movie',
        });
      },
      onSuccess: async data => {
        toast.success(
          `Ваш рейтинг для пользователя ${data.data.user.firstName} ${data.data.user.lastName} принят :)`,
          {
            id: 'set-rating-movie',
          },
        );
        setIsSended(true);
        await queryClient.invalidateQueries([
          'get-single-user',
          data.data.user.id,
        ]);

        setTimeout(() => {
          setIsSended(false);
        }, 2400);
      },
    },
  );

  const handleSkip = () => {
    setShowRating(false);
  };

  const handleClickRating = async (data: ISetRating) => {
    await mutateAsync(data);
  };

  // console.log('data: ', completeEvent);
  return (
    <>
      <div className={styles.container}>
        <p className={''}>
          Завершилось событие &nbsp;
          <Link to={`/events/${notification.sourceId}`} className={styles.span}>
            {notification.sourceData}
          </Link>
        </p>
        {showRating && (
          <>
            <div className={styles.content}>
              <div className={'flex items-center gap-3 grow'}>
                <Link
                  to={`/users/${notification.user.id}`}
                  className={'w-1/2 flex gap-3 items-center'}
                >
                  <Avatar
                    imagePath={notification.user.avatarPath}
                    className={styles.avatar}
                  />
                  <p className={styles.span}>
                    {notification.user.firstName} {notification.user.lastName}
                  </p>
                </Link>
                <Rating
                  size={25}
                  transition
                  allowFraction
                  SVGclassName={'inline h-8'}
                  onClick={nextValue =>
                    handleClickRating({
                      value: nextValue,
                      userId: notification.user.id,
                      eventId: notification.sourceId,
                    })
                  }
                />
              </div>
              <Accordion info={'Поставьте оценки остальным участникам события'}>
                {completeEvent &&
                  completeEvent.users
                    .filter(user => user.id !== completeEvent.creator.id)
                    .map(user => (
                      <div
                        className={' flex items-center gap-3 grow'}
                        key={user.id}
                      >
                        <Link
                          to={`/users/${user.id}`}
                          className={'w-1/2 flex gap-3 items-center'}
                        >
                          <Avatar
                            imagePath={user.avatarPath}
                            className={styles.avatar}
                          />
                          <p className={styles.span}>
                            {user.firstName} {user.lastName}
                          </p>
                        </Link>
                        <Rating
                          transition
                          allowFraction
                          SVGclassName={'inline h-8'}
                          onClick={nextValue =>
                            handleClickRating({
                              value: nextValue,
                              userId: user.id,
                              eventId: notification.sourceId,
                            })
                          }
                        />
                      </div>
                    ))}
              </Accordion>
            </div>
            <Button
              className={`${styles.button} transition ease-in  rounded-xl`}
              type={'button'}
              onClick={handleSkip}
            >
              Пропустить
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default NotificationEventComplete;
