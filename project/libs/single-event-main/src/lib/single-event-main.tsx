import styles from './single-event-main.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { toast } from 'react-toastify';

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

  if (!event) return null;

  console.log('event:', event);
  console.log('event:', event.imageUrl);
  console.log('event:', event.creator.avatarPath);

  return (
    <div className={styles['container']}>
      <h1>Welcome to SingleEventMain! {id}</h1>
    </div>
  );
}

export default SingleEventMain;
