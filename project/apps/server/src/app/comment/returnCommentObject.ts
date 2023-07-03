import { Prisma } from '@prisma/client';
import {
  returnUserObject,
  returnUserSingleEventObject,
} from '../user/returnUserObject';
import { returnTagObject } from '../tag/returnTagObject';
import { ReturnEvent } from '../event/returnEventObject';

// @ts-ignore
// @ts-ignore
// @ts-ignore
export const returnCommentObject: Prisma.CommentSelect & { isLiked: boolean } =
  {
    id: true,
    eventId: true,
    event: {
      select: {
        creatorId: true,
        id: true,
        name: true,
        creator: {
          select: {
            id: true,
            lastName: true,
          },
        },
      },
    },
    message: true,
    parentId: true,
    parent: {
      select: {
        id: true,
        message: true,
        author: {
          select: {
            id: true,
            lastName: true,
          },
        },
      },
    },
    _count: true,
    children: true,
    createdAt: true,
    updatedAt: true,
    isLiked: true,
    likes: {
      select: {
        commentId: true,
        userId: true,
        // @ts-ignore
        userId_commentId: true,
      },
    },
    author: {
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        avatarPath: true,
      },
    },
  };

export type CommentSelect = Prisma.CommentGetPayload<{
  select: typeof returnCommentObject;
}>;
