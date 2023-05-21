import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserUpdateInput {
  @IsEmail(
    {},
    {
      message: 'Неверный Email',
    },
  )
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов',
  })
  @IsNotEmpty()
  password: string;

  @IsString({
    message: 'Имя должно быть строкой',
  })
  firstName?: string;

  @IsString({
    message: 'Фамилия должно быть строкой',
  })
  lastName?: string;

  @IsString({
    message: 'Имя должно быть строкой',
  })
  userName?: string;

  @IsString({
    message: 'Имя должно быть строкой',
  })
  avatarPath?: string;
}
