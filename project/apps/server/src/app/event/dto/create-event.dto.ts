import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateEventDto {
  @IsString({
    message: 'Event name is required',
  })
  name: string;

  @IsString({
    message: 'Event description is required',
  })
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @ValidateIf(data => data !== null)
  coordinateX?: string;

  @IsString()
  @ValidateIf(data => data !== null)
  coordinateY?: string;

  @IsDate({
    message: 'Event date is required',
  })
  @ValidateIf(data => data !== null)
  eventTime?: string;

  @IsArray({
    message: 'Tags should be an array of numbers',
  })
  tags: number[];
}
