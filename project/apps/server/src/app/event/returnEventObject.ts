import { Prisma } from '@prisma/client';
import { returnUserObject } from '../user/returnUserObject';

interface IReturnEvent {
  isParticipate: boolean;
}
export type ReturnEvent = Prisma.EventSelect & { isParticipate: boolean };

export const returnEventObject: ReturnEvent = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  coordinateX: true,
  coordinateY: true,
  eventTime: true,
  peopleCount: true,
  isParticipate: true,
  comments: false,
  status: true,
  _count: {
    select: {
      users: true,
    },
  },
  creator: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
      friends: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          avatarPath: true,
        },
      },
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

export const returnEventFullObject: ReturnEvent = {
  id: true,
  name: true,
  description: true,
  imageUrl: true,
  peopleCount: true,
  isParticipate: true,
  eventTime: true,
  _count: {
    select: {
      users: true,
    },
  },
  creator: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
      friends: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          avatarPath: true,
        },
      },
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
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
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
