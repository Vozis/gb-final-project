import { Module } from '@nestjs/common';
import { TypeTagService } from './type-tag.service';
import { TypeTagController } from './type-tag.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TypeTagController],
  providers: [TypeTagService, PrismaService],
  exports: [TypeTagService],
})
export class TypeTagModule {}
