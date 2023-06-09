import { Prisma } from '@prisma/client';
import { returnEventObject } from '../event/returnEventObject';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  isConfirmed: true,
  firstName: true,
  lastName: true,
  userName: true,
  role: true,
  avatarPath: true,
  averageRating: true,
  friends: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
  creations: {
    select: returnEventObject,
  },
  hobbies: {
    select: {
      id: true,
      name: true,
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  favorites: {
    select: returnEventObject,
  },
  events: {
    select: {
      ...returnEventObject,
    },
  },
};

export const returnHomeUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  userName: true,
  isConfirmed: true,
  role: true,
  avatarPath: true,
  creations: false,
  averageRating: true,
  hobbies: {
    select: {
      id: true,
    },
  },
  favorites: {
    select: {
      id: true,
    },
  },
  events: false,
};

export const returnAuthUserObject: Prisma.UserSelect = {
  id: true,
  userName: true,
  password: true,
  isConfirmed: true,
  role: true,
  firstName: true,
  lastName: true,
  avatarPath: true,
  averageRating: true,
  friends: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
  creations: {
    select: {
      id: true,
      name: true,
    },
  },
  hobbies: {
    select: {
      id: true,
      name: true,
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  favorites: {
    select: {
      id: true,
      name: true,
    },
  },
  events: {
    select: {
      id: true,
    },
  },
};

export const returnUserSingleEventObject: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  userName: true,
  avatarPath: true,
  averageRating: true,
};

export const returnUserFullObject: Prisma.UserSelect = {
  id: true,
  email: true,
  isConfirmed: true,
  password: true,
  firstName: true,
  lastName: true,
  userName: true,
  role: true,
  avatarPath: true,
  creations: true,
  hobbies: true,
  favorites: true,
  events: true,
  averageRating: true,
};

export type UserSelect = Prisma.UserGetPayload<{
  select: typeof returnUserObject;
}>;

export type UserHomeSelect = Prisma.UserGetPayload<{
  select: typeof returnHomeUserObject;
}>;

export type UserAuthSelect = Prisma.UserGetPayload<{
  select: typeof returnAuthUserObject;
}>;

export type UserSingleEventSelect = Prisma.UserGetPayload<{
  select: typeof returnUserSingleEventObject;
}>;

export type UserFullSelect = Prisma.UserGetPayload<{
  select: typeof returnUserFullObject;
}>;
