import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString({
    message: 'Token should be string',
  })
  @IsNotEmpty({
    message: 'Token is required',
  })
  token: string;
}
