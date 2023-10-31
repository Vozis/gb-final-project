import { IsNumber, IsString } from 'class-validator';

export class ToggleDto {
  @IsString({
    message: 'Type is required',
  })
  type: string;

  @IsNumber(
    {},
    {
      message: 'Value is required',
    },
  )
  toggleId: number;
}
