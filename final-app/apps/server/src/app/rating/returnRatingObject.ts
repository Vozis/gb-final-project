import { Prisma } from '@prisma/client';

export const returnRatingObject: Prisma.RatingSelect = {
  id: true,
  value: true,
  createdAt: true,
  userId: true,
  user: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
  eventId: true,
  event: {
    select: {
      id: true,
      name: true,
    },
  },
  authorId: true,
  author: {
    select: {
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      avatarPath: true,
    },
  },
};

export type RatingSelect = Prisma.RatingGetPayload<{
  select: typeof returnRatingObject;
}>;
