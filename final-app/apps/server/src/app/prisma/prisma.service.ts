import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type PrismaService = ReturnType<BasePrismaService['withExtensions']>;

@Injectable()
export class BasePrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  withExtensions() {
    return this.$extends({
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
  }

  async onModuleInit() {
    await this.$connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // this.$on('query', async e => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   console.log(`${e.query} ${e.params}`);
    // });
  }
}
