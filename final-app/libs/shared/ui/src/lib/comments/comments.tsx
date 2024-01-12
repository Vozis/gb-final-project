import styles from './comments.module.scss';
import { useCommentState } from '@project/shared/hooks';
import CreateCommentForm from './create-comment-form/create-comment-form';
import CommentsList from './comments-list/comments-list';
import { IEvent } from '@project/shared/types';

/* eslint-disable-next-line */
export interface CommentsProps {
  event: IEvent;
}

export function Comments({ event }: CommentsProps) {
  const { allComments } = useCommentState();

  console.log('allComments: ', allComments);

  const eventComments = allComments.filter(
    comment => comment.eventId === event.id,
  );

  // console.log('eventComments: ', eventComments);

  return (
    <div className={styles['container']}>
      <h3>Комментарии:</h3>
      <div>
        {eventComments && <CommentsList items={eventComments} event={event} />}
      </div>
      <CreateCommentForm event={event} />
    </div>
  );
}

export default Comments;
