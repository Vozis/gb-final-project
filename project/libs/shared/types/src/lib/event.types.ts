import { Event } from '@prisma/client';
import { IEventUser } from './user.types';
import { ITag } from './tag.types';

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
