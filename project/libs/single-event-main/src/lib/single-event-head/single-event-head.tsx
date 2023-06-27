import { EventService } from '@project/shared/services';
import { useQuery } from '@tanstack/react-query';
import { AiTwotoneStar } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './single-event-head.module.scss';
import { UserCardSmall } from '@project/shared/ui';
import { useAuthRedux } from '@project/shared/hooks';
/* eslint-disable-next-line */
export interface SingleEventHeadProps {}

export function SingleEventHead(props: SingleEventHeadProps) {
  const { id } = useParams();
  const { user } = useAuthRedux();

  if (!id) return null;

  const { isLoading: isLoadingPublic, data: publicEvent } = useQuery(
    ['get-single-event-public'],
    () => EventService.getSingleEventNoUser(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        toast.success('Событие успешно получено', {
          containerId: 1,
          toastId: 'get-single-event',
        });
      },
      enabled: !!id,
    },
  );

  const { isLoading, data: event } = useQuery(
    ['get-single-event'],
    () => EventService.getSingleEvent(id),
    {
      select: ({ data }) => data,
      onSuccess: () => {
        toast.success('Событие успешно получено', {
          containerId: 1,
          toastId: 'get-single-event',
        });
      },
      enabled: !!user && !!id,
    },
  );

  // if (!event) return null;
  // if (!publicEvent) return null;

  // console.log('publicEvent:', publicEvent);

  return (
    <>
      {event ? (
        <div
          className={styles.card}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${event.imageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <h1 className={styles.card_title}>{event.name}</h1>
          <UserCardSmall
            userProps={event.creator}
            isName
            isInfo
            isPhoto
            isWhite
          />
        </div>
      ) : (
        publicEvent && (
          <div
            className={styles.card}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${publicEvent.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <h1 className={styles.card_title}>{publicEvent.name}</h1>
            <UserCardSmall
              userProps={publicEvent.creator}
              isName
              isInfo
              isPhoto
              isWhite
            />
          </div>
        )
      )}
    </>
  );
}

export default SingleEventHead;
