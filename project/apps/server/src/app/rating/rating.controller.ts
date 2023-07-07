import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import {Auth} from "../auth/decorators/auth.decorator";
import {User} from "../auth/decorators/user.decorator";

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
