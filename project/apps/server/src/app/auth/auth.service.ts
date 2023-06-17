import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Prisma, User } from '@prisma/client';
import { verify } from 'argon2';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnAuth } from './auth.interface';
import { TokenDto } from './dto/token.dto';
import { ITokens } from '@project/shared/types';

import { fileUploadHelper } from '../../utils/file-upload.helper';
import { UserSelect } from '../user/returnUserObject';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    dto: CreateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<ReturnAuth> {
    const isEmailUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    const isUserNameUser = await this.prisma.user.findUnique({
      where: {
        userName: dto.userName,
      },
    });

    if (isEmailUser) throw new BadRequestException('Email already exists');

    if (isUserNameUser)
      throw new BadRequestException('UserName already exists');

    if (avatar) {
      dto.avatarPath = await fileUploadHelper(avatar, 'users');
    }

    const user = await this.userService.create(dto);

    const returnUser = this.returnUserObject(user);
    const tokens = await this.createTokens(returnUser);

    return {
      user: returnUser,
      ...tokens,
    };
  }

  async login(dto: LoginAuthDto): Promise<ReturnAuth> {
    const verifyUser = await this.validateUser(dto);
    const tokens = await this.createTokens(verifyUser);

    return {
      user: verifyUser,
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: TokenDto): Promise<ReturnAuth> {
    if (!refreshToken) throw new BadRequestException('Please login');

    const result = await this.jwtService.verifyAsync<User>(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token or expired token');
    }

    const user = await this.userService.getById(result.id);

    const returnUser = this.returnUserObject(user);

    const tokens = await this.createTokens(returnUser);

    return {
      user: returnUser,
      ...tokens,
    };
  }

  async validateUser(dto: LoginAuthDto): Promise<UserSelect> {
    const _user = await this.userService.getForAuth(dto.email);

    if (!_user) throw new NotFoundException('User not found');

    const isPasswordEqual = await verify(_user.password, dto.password);

    if (!isPasswordEqual) throw new BadRequestException('Wrong password');

    if (_user && isPasswordEqual) {
      const user = this.returnUserObject(_user);

      return user;
    }
    return null;
  }

  private async createTokens(dto: UserSelect): Promise<ITokens> {
    const payload: Partial<User> = {
      id: dto.id,
      email: dto.email,
      role: dto.role,
      userName: dto.userName,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    const expireDate = this.jwtService.decode(accessToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private returnUserObject(user: UserSelect): UserSelect {
    const { password, ...result } = user;

    return result;
  }
}
