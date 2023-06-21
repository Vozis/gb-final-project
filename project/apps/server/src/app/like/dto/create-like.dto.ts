import { IsNumber } from 'class-validator';
import { m } from 'framer-motion';

export class CreateLikeDto {
  @IsNumber({}, { message: 'commentId should be a number' })
  commentId: number;
}
