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
import { UserService } from '../user/user.service';
import { FilterSearchDto } from './dto/search-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  EventSelect,
  returnEventFullObject,
  returnEventObject,
} from './returnEventObject';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { EnumCacheEventRoutes } from './constants';

@Injectable()
export class EventService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    // @Inject('PrismaService')
    // private prisma: CustomPrismaService<ExtendedPrismaClient>,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Get Methods ===============================================================

  async clearCache(str: string[]) {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach(key => {
      str.forEach(strKey => {
        if (key.includes(strKey)) {
          this.cacheManager.del(key);
        }
      });
    });
  }
  async getAllEvents(
    id?: number,
    filterSearchDto?: FilterSearchDto,
    withHobby: string = 'true',
    type: string = 'AND',
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
      filterSearchDto &&
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
      filterSearchDto &&
      filterSearchDto.filterEventFieldsParams &&
      filterSearchDto.filterEventFieldsParams.length !== 0
    ) {
      filterSearchDto.filterEventFieldsParams.forEach((item, index) => {
        filterParams[index] = {
          [item.paramsFilter]: {
            id:
              typeof item.eventFieldValue === 'number'
                ? item.eventFieldValue
                : +item.eventFieldValue,
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
        filterSearchDto &&
        filterSearchDto.filterNestedFieldsParams &&
        filterSearchDto.filterNestedFieldsParams.length !== 0
      ) {
        filterSearchDto.filterNestedFieldsParams.forEach((item, index) => {
          filterTag[index] = {
            [item.paramsCategory]: {
              some: {
                [item.paramsType]:
                  typeof item.nestedFieldValue === 'number'
                    ? item.nestedFieldValue
                    : +item.nestedFieldValue,
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
        filterSearchDto &&
        filterSearchDto.filterNestedFieldsParams &&
        filterSearchDto.filterNestedFieldsParams.length !== 0
      ) {
        filterSearchDto.filterNestedFieldsParams.forEach((item, index) => {
          filterTag[index] = {
            [item.paramsCategory]: {
              some: {
                [item.paramsType]:
                  typeof item.nestedFieldValue === 'number'
                    ? item.nestedFieldValue
                    : +item.nestedFieldValue,
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
            [type]: [
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
          item.isParticipate = true;
        } else {
          item.isParticipate = false;
        }
        return item;
      });
    } else {
      console.log('result: ', result);
      return result;
    }
  }

  async getById(eventId: number, id?: number): Promise<any> {
    try {
      const result = await this.prisma.event.findUnique({
        where: { id: eventId },
        select: { ...returnEventFullObject },
      });

      if (!result) throw new NotFoundException('Event not found');

      if (id) {
        if (result.users.some(user => user.id === id)) {
          result.isParticipate = true;
        } else {
          result.isParticipate = false;
        }
        return result;
      } else {
        return result;
      }
    } catch (e) {
      console.log(e);
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
        peopleCount: +dto.peopleCount,
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

    newEvent.isParticipate = !thisTimeEvent;

    this.eventEmitter.emit(ENotificationType.CreateEventNote, newEvent);

    await this.clearCache([
      EnumCacheEventRoutes.GET_ALL_EVENTS,
      EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
      `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${newEvent.id}-null`,
      `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${newEvent.id}-null`,
    ]);

    // @ts-ignore
    return newEvent;
  }

  // Update ====================================================================
  async updateEvent(
    id: number,
    dto: UpdateEventDto,
    image: Express.Multer.File,
  ): Promise<EventSelect> {
    console.log('UpdateEventDto: ', dto);

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
        peopleCount: +dto.peopleCount,
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

    await this.clearCache([
      EnumCacheEventRoutes.GET_ALL_EVENTS,
      EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
      `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${updatedEvent.id}-null`,
      `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${updatedEvent.id}-null`,
    ]);

    // @ts-ignore
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

    await this.clearCache([
      EnumCacheEventRoutes.GET_ALL_EVENTS,
      EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
      `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${result.id}-null`,
      `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${result.id}-null`,
    ]);

    return result;
  }

  async cancelEvent(id: number) {
    await this.clearCache([
      EnumCacheEventRoutes.GET_ALL_EVENTS,
      EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
      `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${id}-null`,
      `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${id}-null`,
    ]);

    return this.prisma.event.update({
      where: { id },
      data: {
        status: 'CANCELED',
      },
    });
  }

  async getUserEvents(userId: number) {
    const eventsSearchFilter: Prisma.EventWhereInput = {
      OR: [
        {
          creator: {
            id: userId,
          },
        },
        {
          users: {
            some: {
              id: userId,
            },
          },
        },
      ],
    };

    const result = await this.prisma.event.findMany({
      where: eventsSearchFilter,
      orderBy: {
        eventTime: 'desc',
      },
      select: {
        ...returnEventObject,
        isParticipate: true,
      },
    });

    result.forEach(item => {
      if (item.users.some(user => user.id === userId)) {
        item.isParticipate = true;
      } else {
        item.isParticipate = false;
      }
    });

    return result;
  }

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
    await this.clearCache([
      EnumCacheEventRoutes.GET_ALL_EVENTS,
      EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
      `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${id}-null`,
      `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${id}-null`,
    ]);
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
        status: 'OPEN',
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
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              userName: true,
              avatarPath: true,
            },
          },
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              userName: true,
              avatarPath: true,
            },
          },
        },
      });

      this.eventEmitter.emit(
        ENotificationType.CompleteEventNote,
        finishedEvent,
      );

      await this.clearCache([
        EnumCacheEventRoutes.GET_ALL_EVENTS,
        EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS,
        `${EnumCacheEventRoutes.GET_EVENTS_BY_ID}-${finishedEvent.id}-null`,
        `${EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID}-${finishedEvent.id}-null`,
      ]);
    }

    return finishedEvents;
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

  async getForRating(id: number) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
          },
        },
      },
    });
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
