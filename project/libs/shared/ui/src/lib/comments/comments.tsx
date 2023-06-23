import styles from './comments.module.scss';
import { useActions, useCommentState } from '@project/shared/hooks';
import CreateCommentForm from './create-comment-form/create-comment-form';
import CommentsItem from './comments-item/comments-item';
import CommentsList from './comments-list/comments-list';

/* eslint-disable-next-line */
export interface CommentsProps {
  eventId: string;
}

export function Comments({ eventId }: CommentsProps) {
  const { allComments } = useCommentState();

  const eventComments = allComments.filter(
    comment => comment.eventId === +eventId,
  );

  // console.log('eventComments: ', eventComments);

  return (
    <div className={styles['container']}>
      <h3>Комментарии:</h3>
      <div>
        {eventComments && (
          <CommentsList items={eventComments} eventId={eventId} />
        )}
      </div>
      <CreateCommentForm eventId={eventId} />
    </div>
  );
}

export default Comments;
