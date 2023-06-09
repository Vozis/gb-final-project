import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('confirm')
  async confirmEmail(@Body() dto: ConfirmEmailDto) {
    // console.log('post confirm email');
    const email = await this.mailService.verifyEmailToken(dto.token);
    // console.log('Email verified');
    return this.mailService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  @Auth()
  async resendConfirmationLink(@User('id') id: number) {
    return await this.mailService.resendConfirmationLink(id);
  }
}
