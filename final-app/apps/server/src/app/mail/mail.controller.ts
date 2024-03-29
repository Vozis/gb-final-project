import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfirmEmailTokenDto, ConfirmResetPassword } from './dto/email.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { UserService } from '../user/user.service';
import { Cron } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  @Post('confirm')
  async confirmEmail(@Body() dto: ConfirmEmailTokenDto) {
    const { email } = await this.mailService.verifyEmailToken(dto.token);
    return this.mailService.confirmEmail(email);
  }

  @Post('send-reset')
  async sendResetPasswordLink(@Body() dto: { email: string }) {
    return this.mailService.sendResetPasswordLink(dto.email);
  }

  @Post('check-reset-password')
  async checkResetPasswordToken(@Body() dto: ConfirmResetPassword) {
    return this.mailService.verifyEmailToken(dto.token);
    // return this.userService.update(id, { password: dto.password });
    // return this.mailService.resetPassword({ email, password: dto.password });
  }

  @Post('resend-confirmation-link')
  @Auth()
  async resendConfirmationLink(@User('id') id: number) {
    console.log('get resend confirmation link');
    return await this.mailService.resendConfirmationLink(id);
  }

  @Cron('57 23 * * *')
  // переделать раз в сутки
  async sendEventReminder() {
    return this.mailService.sendEventReminder();
  }

  @Get('test-reminder')
  async testReminder() {
    return this.mailService.sendEventReminder();
  }
}
