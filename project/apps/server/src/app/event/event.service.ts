import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash';
import { fileUploadHelper } from '../../utils/file-upload.helper';
import { ToggleDto } from '../../utils/toggle.dto';
import { EventParticipateNotification } from '../notification/dto/create-notification.dto';
import { ENotificationType } from '../notification/notification.types';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { FilterSearchDto } from './dto/search-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  EventFullSelect,
  EventSelect,
  returnEventFullObject,
  returnEventObject,
} from './returnEventObject';

@Injectable()
export class EventService {
  constructor(
    // private readonly prisma: PrismaExtensionService,
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // Get Methods ===============================================================
  async getAllEvents(
    id?: number,
    filterSearchDto?: FilterSearchDto,
    withHobby: string = 'true',
  ) {
    // console.log('id: ', id);
    // console.log('filterSearchDto: ', filterSearchDto);
    // console.log('withHobby: ', withHobby);

    // : Promise<EventSelect[]>
    let search = {};
    let filterTag = [];
    let filterParams = [];
    let userSportHobbies = [];

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

    if (id) {
      const _user = await this.userService.getById(id);
      // console.log(_user.hobbies);

      userSportHobbies = _user.hobbies.filter(
        // @ts-ignore
        hobby => hobby.type.name === 'sport',
      );

      // console.log(userSportHobbies);

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
      } else {
        if (withHobby === 'true') {
          filterTag.push({
            tags: {
              some: {
                id: {
                  in: userSportHobbies.map(tag => tag.id),
                },
              },
            },
          });
        }
      }
    } else {
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
    }

    // console.log('filterParams', filterParams);
    // console.log('filterTags', filterTag);
    // console.log('search', search);

    const eventsSearchFilter: Prisma.EventWhereInput =
      !isEmpty(search) || filterTag.length || filterParams.length
        ? {
            AND: [
              search,
              {
                OR: filterTag,
              },
              {
                AND: filterParams,
              },
            ],
            eventTime: {
              gt: new Date(),
            },
          }
        : {
            eventTime: {
              gt: new Date(),
            },
          };

    // console.log('eventsSearchFilter:', eventsSearchFilter);

    const result = await this.prisma.event.findMany({
      where: eventsSearchFilter,
      select: returnEventObject,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new NotFoundException('По запросу нет событий');

    if (id) {
      return result.map(item => {
        if (item.users.some(user => user.id === id)) {
          // @ts-ignore
          item.isParticipate = true;
        } else {
          // @ts-ignore
          item.isParticipate = false;
        }
        return item;
      });
    } else {
      // console.log('result: ', result);
      return result;
    }
  }

  async getById(eventId: number, id?: number): Promise<EventFullSelect> {
    const result = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: returnEventFullObject,
    });

    if (!result) throw new NotFoundException('Event not found');

    if (id) {
      if (result.users.some(user => user.id === id)) {
        // @ts-ignore
        result.isParticipate = true;
      } else {
        // @ts-ignore
        result.isParticipate = false;
      }
      return result;
    } else {
      return result;
    }
  }

  async getFinishedEvents(id: number) {
    const currentDate = new Date();

    const result = await this.prisma.event.findMany({
      where: {
        users: {
          some: {
            id: id,
          },
        },
        eventTime: {
          lte: currentDate,
        },
      },
    });

    return result;
  }

  // Create ====================================================================

  async createEvent(
    creatorId: number,
    dto: CreateEventDto,
    image: Express.Multer.File,
  ): Promise<EventSelect> {
    if (image) {
      dto.imageUrl = await fileUploadHelper(image, 'events');
    }

    const thisTimeEvent = await this.checkTimeEvent(dto.eventTime, creatorId);

    const newEvent = await this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        eventTime: new Date(dto.eventTime),
        peopleCount: dto.peopleCount,
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
          connect: thisTimeEvent ? undefined : { id: creatorId },
        },
      },
      select: returnEventObject,
    });

    // @ts-ignore
    newEvent.isParticipate = !thisTimeEvent;

    this.eventEmitter.emit(ENotificationType.CreateEventNote, newEvent);

    return newEvent;
  }

  // Update ====================================================================
  async updateEvent(
    id: number,
    dto: UpdateEventDto,
    image: Express.Multer.File,
  ): Promise<EventSelect> {
    if (image) {
      dto.imageUrl = await fileUploadHelper(image, 'events');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        eventTime: new Date(dto.eventTime),
        peopleCount: dto.peopleCount,
        tags: {
          set: [],
          connect:
            typeof dto.tags === 'object'
              ? dto.tags.map(id => ({ id: +id }))
              : dto.tags
              ? { id: +dto.tags }
              : undefined,
        },
      },
      select: returnEventObject,
    });

    this.eventEmitter.emit(ENotificationType.UpdateEventNote, updatedEvent);

    return updatedEvent;
  }

  async toggle(id: number, dto: ToggleDto) {
    const _event = await this.getById(id);

    const isExist = await this.prisma.event
      .count({
        where: {
          id,
          users: {
            some: {
              id: dto.toggleId,
            },
          },
        },
      })
      .then(Boolean);

    // console.log('event: ', _event);

    if (dto.type === 'users') {
      if (!isExist) {
        const thisTimeEvent = await this.checkTimeEvent(
          _event.eventTime,
          dto.toggleId,
        );

        if (thisTimeEvent) throw new BadRequestException('no free time');
      }

      if (
        // @ts-ignore
        _event._count.users === _event.peopleCount &&
        !_event.users.some(user => user.id === dto.toggleId)
      ) {
        throw new BadRequestException('Max people count exceeded');
      }
    }

    const result = await this.prisma.event.update({
      where: { id: id },
      data: {
        [dto.type]: {
          [isExist ? 'disconnect' : 'connect']: {
            id: dto.toggleId,
          },
        },
      },
      select: {
        ...returnEventObject,
        isParticipate: true,
      },
    });

    if (dto.type === 'users') {
      const userEventStatusDto: EventParticipateNotification = {
        event: result,
        id: dto.toggleId,
      };

      !isExist
        ? this.eventEmitter.emit(
            ENotificationType.ParticipateEventNote,
            userEventStatusDto,
          )
        : this.eventEmitter.emit(
            ENotificationType.LeaveEventNote,
            userEventStatusDto,
          );
    }

    if (result.users.some(user => user.id === dto.toggleId)) {
      result.isParticipate = true;
    } else {
      result.isParticipate = false;
    }
    return result;
  }

  async cancelEvent(id: number) {
    return this.prisma.event.update({
      where: { id },
      data: {
        status: 'CANCELED',
      },
    });
  }

  // async getUserEvents(userId: number): Promise<EventSelect[]> {
  //   return this.prisma.event.findMany({
  //     where: {
  //       creator: {
  //         id: userId,
  //       },
  //     },
  //     select: returnEventObject,
  //   });
  // }

  // async getByUserTags(id: number): Promise<EventSelect[]> {
  //   const _user = await this.userService.getById(id);
  //
  //   return this.prisma.event.findMany({
  //     where: {
  //       tags: {
  //         some: {
  //           id: {
  //             in: _user.hobbies.map(tag => tag.id),
  //           },
  //         },
  //       },
  //     },
  //     select: returnEventObject,
  //   });
  // }

  async delete(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async changeScheduleEventStatus() {
    const currentDate = new Date();

    const finishedEvents = await this.prisma.event.findMany({
      where: {
        eventTime: {
          lte: currentDate,
        },
      },
    });

    for (const event of finishedEvents) {
      const finishedEvent = await this.prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          status: 'CLOSED',
        },
      });
      // this.eventEmitter.emit(
      //   ENotificationType.CompleteEventNote,
      //   finishedEvent,
      // );
    }

    // return finishedEvents;
  }

  async getTomorrowEvents() {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    const result = await this.prisma.event.findMany({
      where: {
        eventTime: {
          gt: currentDate,
          lte: tomorrowDate,
        },
      },
      include: {
        users: {
          select: {
            email: true,
            firstName: true,
          },
        },
      },
    });

    return result;
  }

  private async checkTimeEvent(eventTime: Date, userId: number) {
    // console.log(eventTime);

    const minTime = new Date(eventTime);
    const maxTime = new Date(eventTime);
    minTime.setHours(minTime.getHours() - 2);
    maxTime.setHours(maxTime.getHours() + 2);

    // console.log(minTime);
    // console.log(maxTime);

    const result = await this.prisma.event.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        eventTime: {
          gt: minTime,
          lte: maxTime,
        },
      },
    });

    // console.log('result', result);

    return result;
  }
}
