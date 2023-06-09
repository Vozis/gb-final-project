import { EventService } from '@project/shared/services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './single-event-main.module.scss';
/* eslint-disable-next-line */
export interface SingleEventMainProps {}

export function SingleEventMain(props: SingleEventMainProps) {
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

  console.log('event:', event);
  console.log('event creator:', event?.creator?.id);

  return (
    <div className={styles['container']}>
      <h1>Welcome to SingleEventMain! {id}</h1>
      {event && (
        <div
          className={styles.card}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), linear-gradient(180deg, rgba(0, 0, 0, 0) 40.0%, rgba(0, 0, 0, 0.80) 80.0%), url(${event.imageUrl})`,
            backgroundPosition: 'center',
          }}
        >
          <p className={styles.white}>Получилось</p>
          {/* <img
            className={styles.avatarImg}
            src={event.creator}
            alt={'avatar'}
          /> */}
        </div>
      )}
    </div>
  );
}

export default SingleEventMain;
