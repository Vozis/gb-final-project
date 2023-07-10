import { ITag } from './tag.types';
import { IUserSmall } from './user.types';

export interface ICount {
  users: number;
}

export enum IEventStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
  ACTIVE = 'ACTIVE',
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
  status?: IEventStatus;
}

export interface IEventResponse {
  events: IEvent[];
}

export interface ICreateEvent {
  name: string;
  description: string;
  image: string;
  eventTime?: string;
  sport: number[];
  place: number[];
  city: number[];
  peopleCount: number;
  time: number[];
}

export interface IUpdateEvent extends Partial<ICreateEvent> {}
