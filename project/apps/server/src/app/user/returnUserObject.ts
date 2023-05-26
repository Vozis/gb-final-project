import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
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

export type UserFullSelect = Prisma.UserGetPayload<{
  select: typeof returnUserFullObject;
}>;
