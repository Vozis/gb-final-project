import { Event } from '@prisma/client';

export interface IEvent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  coordinateX?: string;
  coordinateY?: string;
  eventTime?: Date;
}
