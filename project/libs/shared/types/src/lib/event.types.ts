import { Event } from '@prisma/client';
import { IEventUser, IUser, IUserSingleEvent } from './user.types';
import { ITag } from './tag.types';

export interface IEvent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  coordinateX?: string;
  coordinateY?: string;
  eventTime?: Date;
  creator: IUserSingleEvent;
  users: IUserSingleEvent[];
  tags: ITag[];
}

export interface IEventForCard {
  id: number;
  name: string;
  imageUrl: string;
  tags: ITag[];
  eventTime?: Date;
  creator?: IUserSingleEvent | null;
  users: IEventUser[];
}

export interface IEventResponse {
  events: IEvent[];
}

export interface ICreateEvent {
  name: string;
  description: string;
  image: string;
  sport: number[];
  place: number[];
  city: number[];
  count: number[];
}
