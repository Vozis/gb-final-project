import { IComment, IEvent } from '@project/shared/types';

import { Avatar, BiIcon, Button, CreateCommentForm, MaterialIcon } from '@project/shared/ui';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import TimeAgo from 'react-timeago';
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// @ts-ignore
import russianStrings from 'react-timeago/lib/language-strings/ru';
import { Link } from 'react-router-dom';
import { useActions, useAuthRedux } from '@project/shared/hooks';

import cn from 'clsx';

/* eslint-disable-next-line */
export interface CommentsItemProps {
  item: IComment;
  event: IEvent;
}

const formatter = buildFormatter(russianStrings);

export function CommentsItem({ item, event }: CommentsItemProps) {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const parentIdItem = useRef<HTMLDivElement | null>(null);
  const [isTimeAgo, setIsTimeAgo] = useState(false);
  const { submitCommentDelete, toggleCommentLike } = useActions();

  const { user } = useAuthRedux();

  const isProfile = user?.id === item.author.id;

  useEffect(() => {
    const createDate = new Date(item.createdAt);

    createDate < new Date() && setIsTimeAgo(true);
  }, []);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div
      className={cn('flex gap-3 relative')}
      ref={parentIdItem}
      id={String(item.id)}
    >
      <Link
        to={isProfile ? '/profile' : `/users/${item.author.id}`}
        className={''}
      >
        <Avatar
          imagePath={item.author.avatarPath}
          style={{
            width: '50px',
            height: '50px',
          }}
          isStatusVisible={false}
        />
      </Link>
      <div>
        <div>
          <Link
            to={isProfile ? '/profile' : `/users/${item.author.id}`}
            className={''}
          >
            {item.author.firstName} {item.author.lastName}
          </Link>
          <p className={'text-black'}>{item.message}</p>
        </div>
        <div className={'flex justify-between items-center gap-4'}>
          <TimeAgo date={item.createdAt} formatter={formatter} minPeriod={5} />
          <button className={'border-b border-black'} onClick={handleClick}>
            Ответить
          </button>
          <Button
            onClick={() => toggleCommentLike({ commentId: item.id })}
            className={'gap-1'}
          >
            {item.isLiked ? (
              <BiIcon name={'BiSolidHeart'} />
            ) : (
              <BiIcon name={'BiHeart'} />
            )}
            <p>{item._count.likes}</p>
          </Button>
        </div>
        {isFormOpen && (
          <CreateCommentForm parentId={String(item.id)} event={event} />
        )}
      </div>
      <Button
        onClick={() => submitCommentDelete({ id: item.id })}
        className={'absolute right-0 top-0'}
      >
        <MaterialIcon name={'MdClose'} />
      </Button>
    </div>
  );
}

export default CommentsItem;
