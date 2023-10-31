import { IsNumber, IsString } from 'class-validator';

export class SearchRatingDto {
  @IsString({ message: 'Param should be a string' })
  param: string;

  @IsNumber({}, { message: 'Value should be a number' })
  value: string;
}
