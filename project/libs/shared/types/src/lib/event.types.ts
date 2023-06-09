import { ITag } from './tag.types';
import { IEventUser } from './user.types';

export interface IEvent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  coordinateX?: string;
  coordinateY?: string;
  eventTime?: Date;
  creator: IEventUser | null;
  users: IEventUser[];
  tags: ITag[];
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
