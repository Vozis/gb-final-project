import { Comment } from '@prisma/client';
import { IUserSmall } from './user.types';
import { ILike } from './like.types';

export enum CommentEvent {
  CreateComment = 'createComment',
  GetAllComments = 'getAllComments',
  SendAllComments = 'sendAllComments',
  ReceiveComment = 'receiveComment',
  RemoveComment = 'removeComment',
  DeleteComment = 'deleteComment',
}

export interface ICommentPayload {
  message: string;
  parentId?: number;
}

export interface IComment {
  id: number;
  message: string;
  eventId: number;
  parentId?: number;
  parent: {
    authorId: number;
  };
  author: IUserSmall;
  children: IComment[];
  createdAt: string;
  updatedAt: string;
  likes: ILike[];
  _count: {
    children: number;
    likes: number;
  };
  isLiked?: boolean;
}

export interface ICommentCreateForm {
  message: string;
}
