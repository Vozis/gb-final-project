import { IsOptional, IsString } from 'class-validator';

export class SearchEventDto {
  @IsString()
  @IsOptional()
  paramsSearch: string;

  @IsString()
  @IsOptional()
  valuesSearch: string;
}
