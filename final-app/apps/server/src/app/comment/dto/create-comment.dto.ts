import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'Message should be a string' })
  message: string;

  // @IsNumber({}, { message: 'userId should be a number' })
  // userId: number;

  @IsNumber({}, { message: 'eventId should be a number' })
  eventId: number;

  @IsOptional()
  @IsNumber({}, { message: 'parentId should be a number' })
  parentId?: number;

  @IsOptional()
  @IsString({ message: 'eventStatus should be a string' })
  eventStatus?: string;

  @IsDate({
    message: 'Event date is required',
  })
  @ValidateIf(data => data !== null)
  eventTime?: Date;
}
