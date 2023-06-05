import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { path } from 'app-root-path';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
