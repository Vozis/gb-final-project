import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Public routes =============================================================

  @Get(':eventId')
  async getAllToEventPublic(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.commentService.getAllToEvent(undefined, eventId);
  }

  // User routes ===============================================================

  @Auth()
  @Get(':eventId')
  async getAllToEvent(
    @User('id') id: number,
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    return this.commentService.getAllToEvent(id, eventId);
  }

  @Auth()
  @Post(':eventId')
  async createComment(
    @User('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(id, createCommentDto);
  }

  @Auth()
  @Put(':commentId')
  async updateComment(
    @User('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.updateComment(id, commentId, updateCommentDto);
  }

  @Auth()
  @Delete(':commentId')
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentService.deleteComment(commentId);
  }
}
