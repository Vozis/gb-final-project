import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

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
import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-yet';
import { redisStore } from 'cache-manager-ioredis-yet';
// import * as redisStore from 'cache-manager-redis-store';
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom';
import { extendedPrismaClient } from './prisma/prisma.extension';
import { PrismaCustomModule } from './prisma/prisma-custom.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath:
        process.env.NODE_ENV === 'production'
          ? `${path}/assets`
          : `${path}/dist/apps/server/assets`,
      serveRoot: '/assets',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          // socket: {
          // },
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          username: configService.get('REDIS_USERNAME'),
          password: configService.get('REDIS_PASSWORD'),
          name: 'redis-cache-sport',
        }),
        // ttl: +configService.get('CACHE_TTL'),
      }),
    }),
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
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
