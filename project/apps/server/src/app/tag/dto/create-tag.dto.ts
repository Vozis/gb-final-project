import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'shortName is required',
  })
  shortName: string;

  @IsString({
    message: 'Type is required',
  })
  type: string;
}

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
