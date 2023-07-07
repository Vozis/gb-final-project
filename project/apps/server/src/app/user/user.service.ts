import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BasePrismaService, PrismaService } from '../prisma/prisma.service';
import { Role, User, Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { ToggleDto } from '../../utils/toggle.dto';

import {
  returnAuthUserObject,
  returnUserFullObject,
  returnUserObject,
  UserAuthSelect,
  UserFullSelect,
  UserSelect,
} from './returnUserObject';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENotificationType } from '../notification/notification.types';
import { FriendsNotification } from '../notification/dto/create-notification.dto';
import { fileUploadHelper } from '../../utils/file-upload.helper';
import { MailService } from '../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserSelect> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
        firstName: createUserDto.firstName ? createUserDto.firstName : 'User',
        lastName: createUserDto.lastName ? createUserDto.lastName : 'Cool',
        userName: createUserDto.userName ? createUserDto.userName : uuidv4(),
        role: Role.USER,
        hobbies: {
          connect:
            typeof createUserDto.hobbies === 'object'
              ? createUserDto.hobbies.map(id => ({ id: +id }))
              : createUserDto.hobbies
              ? { id: +createUserDto.hobbies }
              : undefined,
        },
      },
      select: returnUserObject,
    });
  }

  async getAll(searchTerm?: string) {
    const prismaSearchFilter: Prisma.UserWhereInput = searchTerm
      ? {
          OR: [
            {
              userName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              firstName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    return this.prisma.user.findMany({
      where: prismaSearchFilter,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        avatarPath: true,
      },
    });
  }

  async getById(userId: number, id?: number) {
    const _user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        isConfirmed: true,
        firstName: true,
        lastName: true,
        userName: true,
        avatarPath: true,
        role: true,
        friends: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            avatarPath: true,
          },
        },
        hobbies: {
          select: {
            id: true,
            name: true,
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        events: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            status: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        favorites: {
          select: {
            id: true,
            status: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        creations: {
          select: {
            status: true,
            id: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    const ratings = await this.prisma.rating.aggregate({
      where: {
        userId: userId,
      },
      _avg: {
        rating: true
      },
    })
    const userRating = ratings._avg.rating;
    if (!_user) throw new NotFoundException('User not found');

    if (id) {
      const events = _user.events.map(item => {
        item.isParticipate = true;
        return item;
      });
      const favorites = _user.favorites.map(item => {
        if (item.users.some(user => user.id === id)) {
          item.isParticipate = true;
        } else {
          item.isParticipate = false;
        }
        return item;
      });
      const creations = _user.creations.map(item => {
        if (item.users.some(user => user.id === id)) {
          item.isParticipate = true;
        } else {
          item.isParticipate = false;
        }
        return item;
      });

      return {
        ..._user,
        creations,
        favorites,
        events,
        userRating
      };
    } else {
      return _user;
    }
  }

  async getByEmail(email: string): Promise<UserSelect> {
    const _user = await this.prisma.user.findUnique({
      where: { email },
      select: returnUserObject,
    });

    // if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  async getForAuth(email: string): Promise<UserAuthSelect> {
    const _user = await this.prisma.user.findUnique({
      where: { email },
      select: returnAuthUserObject,
    });

    if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  async getByUserName(userName: string): Promise<UserSelect> {
    const _user = await this.prisma.user.findUnique({
      where: { userName },
      select: returnUserObject,
    });

    if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  // async getFavorites(): Promise<I> {}

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<UserSelect> {
    console.log('updateUserDto', updateUserDto);

    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    let email;
    let isConfirmed = true;
    if (updateUserDto.email) {
      const isSameUser = await this.getByEmail(updateUserDto.email);
      if (isSameUser && isSameUser.id !== id)
        throw new BadRequestException(
          'Данный email уже используется для другого аккаунта',
        );
      email = updateUserDto.email;
      isConfirmed = false;

      // Confirm new email
      const payload: { email: string; id: number } = {
        email: user.email,
        id: user.id,
      };
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      });
      const url = `${this.configService.get<string>(
        'FRONTEND_API',
      )}/confirm-email?token=${token}`;

      await this.mailerService
        .sendMail({
          to: email,
          subject: `Добро пожаловать, ${user.firstName}!`,
          template: './confirm-email',
          context: {
            name: `${user.firstName} ${user.lastName}`,
            url: url,
          },
        })
        .then(res => {
          // console.log('res: ', res);
        })
        .catch(err => {
          console.log('err: ', err);
        });
    }

    if (avatar) {
      updateUserDto.avatarPath = await fileUploadHelper(avatar, 'users');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        email: email ? email : user.email,
        isConfirmed: !isConfirmed ? false : user.isConfirmed,
        password:
          updateUserDto.password && updateUserDto.password !== 'undefined'
            ? await hash(updateUserDto.password)
            : user.password,
        hobbies: {
          set: [],
          connect: updateUserDto.hobbies
            ? updateUserDto.hobbies.map(id => ({ id: +id }))
            : [],
        },
      },
      select: returnUserObject,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async toggle(id: number, dto: ToggleDto): Promise<UserSelect> {
    // console.log(dto);

    const isExist = await this.prisma.user
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

    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        [dto.type]: {
          [isExist ? 'disconnect' : 'connect']: {
            id: dto.toggleId,
          },
        },
      },
      select: returnUserObject,
    });

    if (dto.type === 'friends') {
      const notificationDto: FriendsNotification = {
        user,
        id: dto.toggleId,
      };

      isExist
        ? this.eventEmitter.emit(
            ENotificationType.RemoveFriendNote,
            notificationDto,
          )
        : this.eventEmitter.emit(
            ENotificationType.AddFriendNote,
            notificationDto,
          );
    }

    // console.log(user.friends);

    return user;
  }

  async makeEmailConfirmed(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: {
        isConfirmed: true,
      },
      select: returnUserObject,
    });
  }

  async getUserEventsIds(id: number) {
    const userEvents = await this.prisma.user.findUnique({
      where: { id },
      select: {
        events: {
          select: {
            id: true,
          },
        },
      },
    });

    return userEvents.events;
  }

  updateExitDate(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        exitDate: new Date(),
      },
    });
  }

  async findUsersWhereFriends(id: number) {
    return this.prisma.user.findMany({
      where: {
        friends: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        email: true,
        isConfirmed: true,
        firstName: true,
        lastName: true,
        userName: true,
        avatarPath: true,
        role: true,
        friends: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            avatarPath: true,
          },
        },
        hobbies: {
          select: {
            id: true,
            name: true,
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        events: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            status: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        favorites: {
          select: {
            id: true,
            status: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        creations: {
          select: {
            status: true,
            id: true,
            users: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            name: true,
            description: true,
            imageUrl: true,
            eventTime: true,
            peopleCount: true,
            isParticipate: true,
            _count: {
              select: {
                users: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
  }
}
