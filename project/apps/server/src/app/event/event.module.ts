import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { NotificationGateway } from '../notification/notification.gateway';
import { NotificationModule } from '../notification/notification.module';
import { EventGateway } from './event.gateway';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    forwardRef(() => AuthModule),
    NotificationModule,
  ],
  controllers: [EventController],
  providers: [EventService, EventGateway],
  exports: [EventService],
})
export class EventModule {}
