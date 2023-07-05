import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Cron } from '@nestjs/schedule';
import { EventService } from '../event/event.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly eventService: EventService,
  ) {}

  // Send Email Massages
  async sendEmailConfirmation(email: string) {
    const _user = await this.userService.getByEmail(email);
    const payload: { email: string; id: number } = {
      email: _user.email,
      id: _user.id,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const url = `${this.configService.get<string>(
      'FRONTEND_API',
    )}/confirm-email?token=${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        subject: `Добро пожаловать, ${_user.firstName} !`,
        template: './confirm-email',
        context: {
          name: `${_user.firstName} ${_user.lastName}`,
          url: url,
        },
      })
      .then(res => {
        // console.log('res: ', res);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  async sendResetPasswordLink(email: string) {
    const _user = await this.userService.getByEmail(email);
    const payload: { email: string; id: number } = {
      email: _user.email,
      id: _user.id,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const url = `${this.configService.get<string>(
      'FRONTEND_API',
    )}/reset-password?token=${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        subject: `Восстановление пароля для ${_user.firstName}!`,
        template: './reset-password',
        context: {
          name: `${_user.firstName} ${_user.lastName}`,
          url: url,
        },
      })
      .then(res => {
        // console.log('res: ', res);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  async confirmEmail(email: string) {
    const _user = await this.userService.getByEmail(email);

    if (_user.isConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    return await this.userService.makeEmailConfirmed(email);
  }

  async resetPassword(dto: { email: string; password: string }) {
    const _user = await this.userService.getByEmail(dto.email);

    return this.userService.update(_user.id, { password: dto.password });
  }

  async verifyEmailToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        email: string;
        id: number;
      }>(token, {
        secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return {
          ...payload,
        };
      }
      throw new BadRequestException();
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async resendConfirmationLink(id: number) {
    const _user = await this.userService.getById(id);

    if (_user.isConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    return this.sendEmailConfirmation(_user.email);
  }

  // @Cron('* * * * * *')
  // log() {
  //   console.log('Hello world');
  // }

  async sendEventReminder() {
    let mailList = [];
    const tomorrowEvents = await this.eventService.getTomorrowEvents();
    // console.log('tomorrowEvents: ', tomorrowEvents);
    tomorrowEvents.forEach(event => {
      // mailList.push(...event.users);
      event.users.forEach(user => {
        return this.mailerService
          .sendMail({
            to: user.email,
            subject: `Напоминаем, уже завтра состоится ${event.name}`,
            template: './schedule-event-email',
            context: {
              name: `${user.firstName}`,
              eventName: event.name,
              time: event.eventTime,
            },
          })
          .then(res => {
            // console.log('res: ', res);
          })
          .catch(err => {
            console.log('err: ', err);
          });
      });
    });
  }
}
