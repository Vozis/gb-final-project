import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ReturnAuth } from './auth.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenDto } from './dto/token.dto';
import { JwtAuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() dto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<ReturnAuth> {
    console.log('auth/avatar', avatar);

    return this.authService.register(dto, avatar);
  }

  @Post('login')
  async login(@Body() dto: LoginAuthDto): Promise<ReturnAuth> {
    return this.authService.login(dto);
  }
  @Post('get-new-tokens')
  async getNewTokens(@Body() dto: TokenDto): Promise<ReturnAuth> {
    return this.authService.getNewTokens(dto);
  }
}
