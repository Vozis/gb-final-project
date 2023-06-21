export enum ETypeConnect {
  DISCONNECT,
  CONNECT,
}

export enum CommentEvent {
  SendComment = 'sendComment',
  GetAllComments = 'getAllComments',
  SendAllComments = 'sendAllComments',
}

export interface IComment {
  message: string;
  parentId?: number;
}
