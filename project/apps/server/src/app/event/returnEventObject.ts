import { Prisma } from '@prisma/client';
import { returnUserObject } from '../user/returnUserObject';
import { returnTagObject } from '../tag/returnTagObject';

export const returnEventObject: Prisma.EventSelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  creator: {
    select: {
      userName: true,
      id: true,
    },
  },
  users: {
    select: {
      userName: true,
      id: true,
    },
  },
  tags: {
    select: returnTagObject,
  },
};

export const returnEventFullObject: Prisma.EventSelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  creator: true,
  coordinateX: true,
  coordinateY: true,
  users: {
    select: returnUserObject,
  },
  tags: {
    select: returnTagObject,
  },
};

export type EventSelect = Prisma.EventGetPayload<{
  select: typeof returnEventObject;
}>;

export type EventFullSelect = Prisma.EventGetPayload<{
  select: typeof returnEventFullObject;
}>;
