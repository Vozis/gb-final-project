import { Body, Controller, Get, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Auth()
  @Post('/')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }
}
