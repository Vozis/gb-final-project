import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BasePrismaService, PrismaService } from './prisma/prisma.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { path } from 'app-root-path';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { TypeTagModule } from './type-tag/type-tag.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/dist/apps/server/assets`,
      serveRoot: '/assets',
    }),
    UserModule,
    AuthModule,
    TagModule,
    EventModule,
    MailModule,
    TypeTagModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasePrismaService],
})
export class AppModule {}
