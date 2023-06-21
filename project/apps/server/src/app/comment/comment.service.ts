import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllToEvent(eventId: number) {
    return this.prisma.comment.findMany({
      where: {
        eventId,
      },
      include: {
        _count: true,
        children: true,
      },
    });
  }

  async createComment(
    authorId: number,
    eventId: number,
    createCommentDto: CreateCommentDto,
  ) {
    return this.prisma.comment.create({
      data: {
        authorId: authorId,
        parentId: createCommentDto.parentId,
        eventId: eventId,
        message: createCommentDto.message,
      },
    });
  }

  async updateComment(
    id: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const _comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    const isAuthor = _comment.authorId === id;

    if (!isAuthor) return new BadRequestException('You cannot update');

    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: number) {
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
