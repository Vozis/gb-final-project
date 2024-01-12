import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RatingSelect, returnRatingObject } from './returnRatingObject';
import { UserService } from '../user/user.service';
import { SearchRatingDto } from './dto/searchRatingDto';
import { Prisma } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';

@Injectable()
export class RatingService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
    // @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAll(searchRatingDto?: SearchRatingDto): Promise<RatingSelect[]> {
    const ratingSearchFilter: Prisma.RatingWhereInput = searchRatingDto
      ? {
          [searchRatingDto.param]: {
            id: searchRatingDto.value,
          },
        }
      : {};

    const result = await this.prisma.client.rating.findMany({
      where: ratingSearchFilter,
      select: returnRatingObject,
    });

    if (!result || result.length === 0)
      throw new NotFoundException('No rating found with this search params');

    return result;
  }

  async getById(id: number) {
    const result = await this.prisma.client.rating.findUnique({
      where: { id },
      select: returnRatingObject,
    });

    if (!result) throw new NotFoundException('No rating found');

    return result;
  }

  async setRating(authorId: number, createRatingDto: CreateRatingDto) {
    // console.log(createRatingDto);

    const rating = await this.prisma.client.rating.upsert({
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

    // console.log('newRating: ', rating);

    const averageRating = await this.updateAverageUserRating(
      createRatingDto.userId,
    );

    return rating;

    // return {
    //   rating,
    //   averageRating,
    // };
  }

  async updateAverageUserRating(userId: number) {
    const { value } = await this.prisma.client.rating
      .aggregate({
        where: { userId },
        _avg: {
          value: true,
        },
      })
      .then(data => data._avg);

    const rating = await this.userService.updateAverageRating(userId, value);

    return {
      value: rating.averageRating,
    };
  }

  async delete(id: number) {
    return this.prisma.client.rating.delete({
      where: { id },
      select: returnRatingObject,
    });
  }
}
