import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Auth()
  @Post('toggle')
  async create(@User('id') id: number, @Body() createLikeDto: CreateLikeDto) {
    return this.likeService.toggleLike(id, createLikeDto);
  }
}
