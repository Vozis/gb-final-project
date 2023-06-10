import { Module } from '@nestjs/common';
import { TypeTagService } from './type-tag.service';
import { TypeTagController } from './type-tag.controller';

@Module({
  controllers: [TypeTagController],
  providers: [TypeTagService],
})
export class TypeTagModule {}
