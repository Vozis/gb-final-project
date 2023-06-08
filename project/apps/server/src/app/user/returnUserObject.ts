import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  userName: true,
  role: true,
  avatarPath: true,
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
      name: true,
    },
  },
};

export const returnHomeUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  userName: true,
  role: true,
  avatarPath: true,
  creations: false,
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
  role: true,
  firstName: true,
  lastName: true,
  avatarPath: true,
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

export const returnUserFullObject: Prisma.UserSelect = {
  id: true,
  email: true,
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

export type UserFullSelect = Prisma.UserGetPayload<{
  select: typeof returnUserFullObject;
}>;
