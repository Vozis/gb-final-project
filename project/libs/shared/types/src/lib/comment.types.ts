import { Comment } from '@prisma/client';
import { IUserSmall } from './user.types';
import { ILike } from './like.types';

export enum ETypeConnect {
  DISCONNECT,
  CONNECT,
}

export enum CommentEvent {
  CreateComment = 'createComment',
  GetAllComments = 'getAllComments',
  SendAllComments = 'sendAllComments',
  GetUnreadComments = 'getUnreadComments',
  SendUnreadComments = 'sendUnreadComments',
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
