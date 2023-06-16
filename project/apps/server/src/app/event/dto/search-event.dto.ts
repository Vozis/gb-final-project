import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchEventDto {
  paramsSearch?: string;
  valuesSearch?: string;
}

export class FilterNestedFieldsDto {
  paramsCategory?: string;
  paramsType?: string;
  nestedFieldValue?: number | string;
}

export class FilterEventFieldsDto {
  paramsFilter?: string;
  eventFieldValue?: number | string;
}

export class FilterSearchDto {
  @Type(() => SearchEventDto)
  @ValidateNested()
  @IsOptional()
  searchParams: SearchEventDto[];

  @Type(() => FilterNestedFieldsDto)
  @ValidateNested()
  @IsOptional()
  filterNestedFieldsParams: FilterNestedFieldsDto[];

  @Type(() => FilterEventFieldsDto)
  @ValidateNested()
  @IsOptional()
  filterEventFieldsParams: FilterEventFieldsDto[];
}
