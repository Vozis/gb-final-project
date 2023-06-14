import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ToggleDto } from '../../utils/toggle.dto';
import { UserService } from '../user/user.service';
import {
  EventFullSelect,
  EventSelect,
  returnEventFullObject,
  returnEventObject,
} from './returnEventObject';
import { fileUploadHelper } from '../../utils/file-upload.helper';
import { FilterSearchDto } from './dto/search-event.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createEvent(
    creatorId: number,
    dto: CreateEventDto,
    image: Express.Multer.File,
  ): Promise<EventSelect> {
    console.log(dto.tags);

    if (image) {
      dto.imageUrl = await fileUploadHelper(image, 'events');
    }

    return this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        // imageUrl: dto.imageUrl ? dto.imageUrl : '/assets/default-event.png',
        coordinateX: dto.coordinateX ? dto.coordinateX : '0',
        coordinateY: dto.coordinateY ? dto.coordinateY : '0',
        eventTime: dto.eventTime ? dto.eventTime : new Date().toISOString(),
        creator: {
          connect: {
            id: creatorId,
          },
        },
        tags: {
          connect:
            typeof dto.tags === 'object'
              ? dto.tags.map(id => ({ id: +id }))
              : { id: +dto.tags },
        },
        users: {
          connect: {
            id: creatorId,
          },
        },
      },
      select: returnEventObject,
    });
  }

  async toggle(id: number, dto: ToggleDto): Promise<EventSelect> {
    const isExist = await this.prisma.event
      .count({
        where: {
          id: id,
          users: {
            some: {
              id: dto.toggleId,
            },
          },
        },
      })
      .then(Boolean);

    return this.prisma.event.update({
      where: { id: id },
      data: {
        [dto.type]: {
          [isExist ? 'disconnect' : 'connect']: {
            id: dto.toggleId,
          },
        },
      },
      select: returnEventObject,
    });
  }

  async getById(id: number): Promise<EventFullSelect> {
    return this.prisma.event.findUnique({
      where: { id },
      select: returnEventFullObject,
    });
  }

  async getAllEvents(
    filterSearchDto?: FilterSearchDto,
  ): Promise<EventSelect[]> {
    let search = {};
    let filterTag = [];
    let filterParams = [];

    if (
      filterSearchDto.searchParams &&
      filterSearchDto.searchParams?.length !== 0
    ) {
      filterSearchDto.searchParams.forEach(item => {
        search[item.paramsSearch] = {
          contains: item?.valuesSearch,
          mode: 'insensitive',
        };
      });
    }

    if (
      filterSearchDto.filterNestedFieldsParams &&
      filterSearchDto.filterNestedFieldsParams.length !== 0
    ) {
      filterSearchDto.filterNestedFieldsParams.forEach((item, index) => {
        filterTag[index] = {
          [item.paramsCategory]: {
            some: {
              [item.paramsType]:
                typeof item.nestedFieldValue === 'number'
                  ? +item.nestedFieldValue
                  : item.nestedFieldValue,
            },
          },
        };
      });
    }

    if (
      filterSearchDto.filterEventFieldsParams &&
      filterSearchDto.filterEventFieldsParams.length !== 0
    ) {
      filterSearchDto.filterEventFieldsParams.forEach((item, index) => {
        filterParams[index] = {
          [item.paramsFilter]: {
            id:
              typeof item.eventFieldValue === 'number'
                ? +item.eventFieldValue
                : item.eventFieldValue,
          },
        };
      });
    }

    // console.log('filterParams', filterParams);
    // console.log('search', search);

    const eventsSearchFilter: Prisma.EventWhereInput = !isEmpty(filterSearchDto)
      ? {
          OR: [
            search,
            {
              AND: filterTag,
            },
            {
              AND: filterParams,
            },
          ],
        }
      : {};

    const result = await this.prisma.event.findMany({
      where: eventsSearchFilter,
      select: returnEventObject,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new NotFoundException('По запросу нет событий');

    return result;
  }

  async getUserEvents(userId: number): Promise<EventSelect[]> {
    return this.prisma.event.findMany({
      where: {
        creator: {
          id: userId,
        },
      },
      select: returnEventObject,
    });
  }

  async getByUserTags(userId: number): Promise<EventSelect[]> {
    const user = await this.userService.getById(userId);

    return this.prisma.event.findMany({
      where: {
        tags: {
          some: {
            id: {
              in: user.hobbies.map(tag => tag.id),
            },
          },
        },
      },
      select: returnEventObject,
    });
  }

  async delete(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
