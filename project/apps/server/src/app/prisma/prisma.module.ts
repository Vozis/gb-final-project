// import { Module, Global } from '@nestjs/common';
// import { PrismaModule, PrismaService } from 'nestjs-prisma';
// import { PrismaExtensionService } from './prisma-extension.service';
// import { PrismaExtensionClientProvider } from './client-extensions/eventExtension';
//
// @Global()
// @Module({
//   imports: [PrismaModule],
//   providers: [
//     PrismaService,
//     PrismaExtensionService,
//     PrismaExtensionClientProvider,
//   ],
//   exports: [PrismaExtensionService],
// })
// export class PrismaExtensionModule {}

import { Module } from '@nestjs/common';
import { BasePrismaService, PrismaService } from './prisma.service';

export const PRISMA_INJECTION_TOKEN = 'PrismaService';

@Module({
  providers: [
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
