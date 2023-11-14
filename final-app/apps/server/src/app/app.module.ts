import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BasePrismaService } from './prisma/prisma.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { TypeTagModule } from './type-tag/type-tag.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketGateway } from './socket.gateway';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RatingModule } from './rating/rating.module';
import * as process from 'process';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      global: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath:
        process.env.NODE_ENV === 'production'
          ? `${path}/assets`
          : `${path}/dist/apps/server/assets`,
      serveRoot: '/assets',
    }),
    // ServeStaticModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject:[ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     rootPath: `${path}/`,
    //     serveRoot: '/assets',
    //   }),
    // }),
    MailModule,
    UserModule,
    AuthModule,
    TagModule,
    EventModule,
    TypeTagModule,
    CommentModule,
    LikeModule,
    NotificationModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasePrismaService, SocketGateway],
})
export class AppModule {}
