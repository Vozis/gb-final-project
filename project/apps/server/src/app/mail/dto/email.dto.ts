import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailTokenDto {
  @IsString({
    message: 'Token should be string',
  })
  @IsNotEmpty({
    message: 'Token is required',
  })
  token: string;
}

export class ConfirmResetPassword {
  @IsString({
    message: 'Token should be string',
  })
  @IsNotEmpty({
    message: 'Token is required',
  })
  token: string;

  @IsString({
    message: 'Password should be string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}
