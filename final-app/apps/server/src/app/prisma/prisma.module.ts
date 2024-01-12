import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

export const PRISMA_INJECTION_TOKEN = 'PrismaService';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
  ],
  providers: [
    // {
    //   provide: PRISMA_INJECTION_TOKEN,
    //   useFactory(): PrismaService {
    //     return new BasePrismaService().withExtensions();
    //   },
    // },
  ],
  exports: [],
  // exports: [PRISMA_INJECTION_TOKEN],
})
export class PrismaModule {}
