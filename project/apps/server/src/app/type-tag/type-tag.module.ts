import { Module } from '@nestjs/common';
import { TypeTagService } from './type-tag.service';
import { TypeTagController } from './type-tag.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'nestjs-prisma';
import { BasePrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TypeTagController],
  providers: [TypeTagService],
  exports: [TypeTagService],
})
export class TypeTagModule {}
