import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { path } from 'app-root-path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      }),
    }),
    MailerModule.forRoot({
      transport:
        'smtps://anasta.kell@gmail.com:odrdjozqjkldyiup@smtp.gmail.com',
      defaults: {
        from: '"Nest JS робот" <anasta.kell@gmail.com>',
      },
      template: {
        dir: `${path}/apps/server/src/app/mail/templates`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      // preview: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
