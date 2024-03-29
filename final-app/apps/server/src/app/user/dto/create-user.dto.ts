import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

// implements Prisma.UserUpdateInput
export class CreateUserDto {
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
  userName: string;

  @IsString({
    message: 'Имя должно быть строкой',
  })
  @IsOptional()
  avatarPath?: string;

  @IsArray()
  @IsOptional()
  hobbies?: [number];
}
