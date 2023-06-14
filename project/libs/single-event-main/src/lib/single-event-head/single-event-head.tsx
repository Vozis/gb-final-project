import { EventService } from '@project/shared/services';
import { useQuery } from '@tanstack/react-query';
import { AiTwotoneStar } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './single-event-head.module.scss';
import { UserCardSmall } from '@project/shared/ui';
/* eslint-disable-next-line */
export interface SingleEventHeadProps {}

export function SingleEventHead(props: SingleEventHeadProps) {
  const { id } = useParams();

  if (!id) return null;

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
    },
  );

  if (!event) return null;

  console.log('event:', event);

  return (
    <div className={styles['container']}>
      {event && (
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
      )}
    </div>
  );
}

export default SingleEventHead;
