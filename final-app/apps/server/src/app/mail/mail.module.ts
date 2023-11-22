import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'anasta.kell@gmail.com',
          pass: 'odrdjozqjkldyiup',
        },
      },
      defaults: {
        from: '"Nest JS робот" <anasta.kell@gmail.com>',
      },
      template: {
        dir:
          process.env.NODE_ENV === 'production'
            ? `${path}/constants/templates`
            : `${path}/apps/server/src/constants/templates`,
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
