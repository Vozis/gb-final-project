import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
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
}
