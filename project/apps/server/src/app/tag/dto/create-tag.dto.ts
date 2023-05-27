import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'shortName is required',
  })
  // @IsOptional()
  shortName: string;

  @IsString({
    message: 'Type is required',
  })
  type: string;
}
