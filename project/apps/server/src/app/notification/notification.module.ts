import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { UserModule } from '../user/user.module';
import { EventModule } from '../event/event.module';
import { CommentModule } from '../comment/comment.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => EventModule),
    UserModule,
    CommentModule,
    UserModule,
    PrismaModule,
    forwardRef(() => AuthModule),
  ],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
