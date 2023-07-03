import { IComment, IEvent } from '@project/shared/types';
import CommentsItem from '../comments-item/comments-item';
import styles from './comments-list.module.scss';

/* eslint-disable-next-line */
export interface CommentsListProps {
  items: IComment[];
  event: IEvent;
}

export function CommentsList({ items, event }: CommentsListProps) {
  // console.log('itemsComment: ', items);
  return (
    <div className={styles['container']}>
      {items.map(item => (
        <div key={item.id}>
          <CommentsItem item={item} event={event} />
          {item.children && (
            <div className={'ml-10'}>
              <CommentsList items={item.children} event={event} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
