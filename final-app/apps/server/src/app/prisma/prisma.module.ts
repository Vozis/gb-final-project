import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { BasePrismaService, PrismaService } from './prisma.service';

export const PRISMA_INJECTION_TOKEN = 'PrismaService';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: PRISMA_INJECTION_TOKEN,
      useFactory(): PrismaService {
        return new BasePrismaService().withExtensions();
      },
    },
  ],
  exports: [PRISMA_INJECTION_TOKEN],
})
export class PrismaModule {}
