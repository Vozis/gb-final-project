import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { returnRatingObject } from './returnRatingObject';
import { UserService } from '../user/user.service';
import { SearchRatingDto } from './dto/searchRatingDto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RatingService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAll(searchRatingDto?: SearchRatingDto) {
    const ratingSearchFilter: Prisma.RatingWhereInput = searchRatingDto
      ? {
          [searchRatingDto.param]: {
            id: searchRatingDto.value,
          },
        }
      : {};

    const result = await this.prisma.rating.findMany({
      where: ratingSearchFilter,
      select: returnRatingObject,
    });

    if (!result || result.length === 0)
      throw new NotFoundException('No rating found with this search params');

    return result;
  }

  async getById(id: number) {
    const result = await this.prisma.rating.findUnique({
      where: { id },
      select: returnRatingObject,
    });

    if (!result) throw new NotFoundException('No rating found');

    return result;
  }

  async setRating(authorId: number, createRatingDto: CreateRatingDto) {
    return await this.prisma.rating.upsert({
      where: {
        compositeId: {
          eventId: createRatingDto.eventId,
          userId: createRatingDto.userId,
        },
      },
      create: {
        value: createRatingDto.value,
        author: {
          connect: {
            id: authorId,
          },
        },
        user: {
          connect: {
            id: createRatingDto.userId,
          },
        },
        event: {
          connect: {
            id: createRatingDto.eventId,
          },
        },
      },
      update: {
        value: createRatingDto.value,
      },
      select: returnRatingObject,
    });
  }

  async getAverageUserRating(userId: number) {
    const { value } = await this.prisma.rating
      .aggregate({
        where: { userId },
        _avg: {
          value: true,
        },
      })
      .then(data => data._avg);

    console.log(value);
    return this.userService.updateAverageRating(userId, value);
  }

  async delete(id: number) {
    return this.prisma.rating.delete({
      where: { id },
      select: returnRatingObject,
    });
  }
}
