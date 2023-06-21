import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}
  async toggleLike(id: number, createLikeDto: CreateLikeDto) {
    const data = {
      userId: id,
      commentId: createLikeDto.commentId,
    };

    const _like = await this.prisma.like.findUnique({
      where: {
        userId_commentId: data,
      },
    });

    if (!_like) {
      return await this.prisma.like.create({
        data: {
          userId: id,
          commentId: createLikeDto.commentId,
        },
      });
    } else {
      return await this.prisma.like.delete({
        where: {
          userId_commentId: data,
        },
      });
    }
  }
}
