import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentGateway } from './comment.gateway';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => EventModule),
  ],
  providers: [CommentGateway, CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
