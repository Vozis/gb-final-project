import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailConfirmation(email: string) {
    const _user = await this.userService.getByEmail(email);
    const payload: { email: string } = { email: _user.email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const url = `${this.configService.get<string>(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        subject: `Добро пожаловать, ${_user.firstName} !`,
        template: './test',
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

    console.log('User confirmed');
    return await this.userService.makeEmailConfirmed(email);
  }

  async verifyEmailToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
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
}
