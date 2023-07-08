import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @IsNumber(
    {},
    {
      message: 'Rating should be a number',
    },
  )
  value: number;

  @IsNumber(
    {},
    {
      message: 'UserId should be a number',
    },
  )
  userId: number;

  @IsNumber(
    {},
    {
      message: 'EventId should be a number',
    },
  )
  eventId: number;
}
