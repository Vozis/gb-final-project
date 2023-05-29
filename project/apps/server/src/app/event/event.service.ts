import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ToggleDto } from '../../utils/toggle.dto';
import { UserService } from '../user/user.service';
import { EventSelect, returnEventObject } from './returnEventObject';
import { fileUploadHelper } from '../../utils/file-upload.helper';

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
          [dto.type]: {
            some: {
              id: dto.toggleId,
            },
          },
        },
      })
      .then(Boolean);

    if (!isExist) throw new NotFoundException('Event not found');

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

  async getAllEvents(searchTerm?: string): Promise<EventSelect[]> {
    const eventsSearchFilter: Prisma.EventWhereInput = searchTerm
      ? {
          OR: [
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              tags: {
                some: {
                  shortName: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              users: {
                some: {
                  userName: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        }
      : {};

    return this.prisma.event.findMany({
      where: eventsSearchFilter,
      select: returnEventObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
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
