import { ITag } from './tag.types';
import { IEventUser, IUser, IUserSmall } from './user.types';

export interface ICount {
  users: number;
}

export enum IEventStatus {
  OPEN,
  CLOSED,
  CANCELED,
  ACTIVE,
}

export interface IEvent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  coordinateX?: string;
  coordinateY?: string;
  eventTime: string;
  creator: IUserSmall;
  users: IUserSmall[];
  tags: ITag[];
  peopleCount: number;
  _count: ICount;
  status: IEventStatus;
  isParticipate?: boolean | null;
}

export interface IEventForCard {
  id: number;
  name: string;
  imageUrl: string;
  tags: ITag[];
  eventTime: string;
  creator?: IUserSmall;
  users: IUserSmall[];
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
  eventTime?: Date;
  sport: number[];
  place: number[];
  city: number[];
  count: number;
  time: number[];
}
