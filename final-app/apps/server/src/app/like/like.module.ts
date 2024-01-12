import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [PrismaModule, EventModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
