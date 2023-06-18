import { Prisma } from '@prisma/client';
import {
  returnUserObject,
  returnUserSingleEventObject,
} from '../user/returnUserObject';
import { returnTagObject } from '../tag/returnTagObject';

export const returnEventObject: Prisma.EventSelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  coordinateX: true,
  coordinateY: true,
  eventTime: true,
  creator: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
  users: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
  tags: {
    select: {
      id: true,
      name: true,
      type: true,
    },
  },
};

export const returnEventFullObject: Prisma.EventSelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  creator: {
    select: returnUserSingleEventObject,
  },
  coordinateX: true,
  coordinateY: true,
  tags: {
    select: {
      id: true,
      name: true,
      shortName: true,
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  users: {
    select: returnUserSingleEventObject,
  },
};

export const returnEventCardObject: Prisma.EventSelect = {
  id: true,
  name: true,
  imageUrl: true,
  creator: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      avatarPath: true,
    },
  },
  coordinateX: true,
  coordinateY: true,
  tags: {
    select: {
      id: true,
      name: true,
      shortName: true,
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  users: {
    select: returnUserObject,
  },
};

export type EventSelect = Prisma.EventGetPayload<{
  select: typeof returnEventObject;
}>;

export type EventFullSelect = Prisma.EventGetPayload<{
  select: typeof returnEventFullObject;
}>;

export type EventCardSelect = Prisma.EventGetPayload<{
  select: typeof returnEventCardObject;
}>;
