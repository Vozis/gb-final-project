import { EventService } from '@project/shared/services';
import { Tabs, TabsProps, Tag } from '@project/shared/ui';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SingleEventHead from './single-event-head/single-event-head';
import styles from './single-event-main.module.scss';
/* eslint-disable-next-line */
export interface SingleEventMainProps {
  tabs?: TabsProps;
}
const tabs = [
  {
    id: '1',
    label: 'Описание',
    content: 'content tab 1',
  },
  { id: '2', label: 'Участвуют', content: 'content tab 2' },
];

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

  return (
    <div className={styles['container']}>
      <SingleEventHead />

      <Tabs tabs={tabs} />
      <div className={styles.card__tags}>
        {event.tags.map(tag => (
          <Tag
            key={tag.id}
            className={clsx({
              'bg-red-300 hover:bg-red-400': tag.type === 'count',
              [styles.card__tag_place]: tag.type === 'place',
              'bg-green-300 hover:bg-green-400': tag.type === 'city',
              'bg-cyan-300 hover:bg-cyan-400': tag.type === 'sport',
            })}
          >
            {tag.name}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default SingleEventMain;
