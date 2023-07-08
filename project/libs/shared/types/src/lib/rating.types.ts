import { IEvent, IUser } from '@project/shared/types';

export interface IRating {
  value: number;
  id: number;
  userId: number;
  eventId: number;
  authorId: number;
  event: IEvent;
  user: IUser;
  author: IUser;
}

export interface ISetRating {
  value: number;
  userId: number;
  eventId: number;
}

export interface ISearchRating {
  param: string;
  value: number;
}
