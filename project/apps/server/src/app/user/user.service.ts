import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BasePrismaService, PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
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

@Injectable()
export class UserService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
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

  async getAll(): Promise<UserSelect[]> {
    return this.prisma.user.findMany({
      select: returnUserObject,
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

    if (!_user) throw new NotFoundException('User not found');

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserSelect> {
    if (updateUserDto.email) {
      const isSameUser = await this.getByEmail(updateUserDto.email);
      if (isSameUser && isSameUser.id !== id)
        throw new BadRequestException('Email already in use');
    } else {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: updateUserDto.password
            ? await hash(updateUserDto.password)
            : user.password,
          hobbies: {
            set: [],
            connect: updateUserDto.hobbies
              ? updateUserDto.hobbies.map(id => ({ id }))
              : [],
          },
        },
        select: returnUserObject,
      });
    }
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async toggle(id: number, dto: ToggleDto): Promise<UserSelect> {
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

    return this.prisma.user.update({
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
}
