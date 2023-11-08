import { IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber({}, { message: 'commentId should be a number' })
  commentId: number;
}
