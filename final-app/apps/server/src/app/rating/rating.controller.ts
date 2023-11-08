import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { SearchRatingDto } from './dto/searchRatingDto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // User routes ===============================================================

  @Auth()
  @Post('all')
  async getAll(@Body() searchRatingDto?: SearchRatingDto) {
    return this.ratingService.getAll(searchRatingDto);
  }

  // @Auth()
  // @Get(':userId')
  // async getUserRating(@Param('userId', ParseIntPipe) userId: number) {}

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.getById(id);
  }

  @Auth()
  @Post('')
  async setRating(
    @User('id') id: number,
    @Body()
    createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.setRating(id, createRatingDto);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.delete(id);
  }

  @Auth()
  @Get('average/:userId')
  async getAverageRating(@Param('userId', ParseIntPipe) userId: number) {
    return this.ratingService.updateAverageUserRating(userId);
  }
  // Admin routes ==============================================================
}
