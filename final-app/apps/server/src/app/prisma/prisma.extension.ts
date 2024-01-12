import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  result: {
    event: {
      isParticipate: {
        needs: {},
        compute() {
          return null;
        },
      },
    },
    comment: {
      isLiked: {
        needs: {
          id: true,
        },
        compute() {
          return null;
        },
      },
    },
    like: {
      userId_commentId: {
        needs: {
          userId: true,
          commentId: true,
        },
        compute(like) {
          return `${like.userId}_${like.commentId}`;
        },
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
