import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import styles from './single-event-head.module.scss';
import { UserCardSmall } from '@project/shared/ui';
import { useAuthRedux } from '@project/shared/hooks';
import { IEvent, IEventStatus } from '@project/shared/types';

/* eslint-disable-next-line */
export interface SingleEventHeadProps {
  event: IEvent;
}

export function SingleEventHead({ event }: SingleEventHeadProps) {
  const { id } = useParams();
  const { user } = useAuthRedux();

  if (!id) return null;

  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${event.imageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 className={styles.card_title}>{event.name}</h1>
      {event.status !== IEventStatus.OPEN && (
        <p
          className={
            'absolute top-4 right-4 font-semibold px-4 py-2 border border-2 border-white rounded-full'
          }
        >
          {event.status}
        </p>
      )}
      <UserCardSmall userProps={event.creator} isName isInfo isPhoto isWhite />
    </div>
  );
}

export default SingleEventHead;
