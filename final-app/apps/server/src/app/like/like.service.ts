import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';
import { EventService } from '../event/event.service';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';

@Injectable()
export class LikeService {
  constructor(
    // @Inject('PrismaService')
    // private prisma: CustomPrismaService<ExtendedPrismaClient>,
    private readonly eventService: EventService,
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

    await this.eventService.clearCache();

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
