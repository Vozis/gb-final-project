import styles from './comments-list.module.scss';
import { IComment } from '@project/shared/types';
import CommentsItem from '../comments-item/comments-item';
import React from 'react';

/* eslint-disable-next-line */
export interface CommentsListProps {
  items: IComment[];
  eventId: string;
}

export function CommentsList({ items, eventId }: CommentsListProps) {
  return (
    <div className={styles['container']}>
      {items.map(item => (
        <div key={item.id}>
          <CommentsItem item={item} eventId={eventId} />
          {item.children && (
            <div className={'ml-10'}>
              <CommentsList items={item.children} eventId={eventId} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
