import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { EventModule } from '../event/event.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
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
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      }),
    }),
    forwardRef(() => EventModule),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
