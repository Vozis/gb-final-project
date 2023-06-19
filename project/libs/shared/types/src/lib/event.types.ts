import { ITag } from './tag.types';
import { IEventUser, IUser, IUserSingleEvent } from './user.types';

export interface ICount {
  users: number;
}

export interface IEvent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  coordinateX?: string;
  coordinateY?: string;
  eventTime: Date;
  creator: IUserSingleEvent;
  users: IUserSingleEvent[];
  tags: ITag[];
  peopleCount: number;
  _count: ICount;
  isParticipate?: boolean | null;
}

export interface IEventForCard {
  id: number;
  name: string;
  imageUrl: string;
  tags: ITag[];
  eventTime: Date;
  creator?: IUserSingleEvent;
  users: IUserSingleEvent[];
  peopleCount: number;
  _count: ICount;
  isParticipate?: boolean | null;
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
  count: number;
  time: number[];
}
