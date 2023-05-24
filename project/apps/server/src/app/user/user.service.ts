import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { ToggleDto } from '../tag/dto/create-tag.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
        firstName: createUserDto.firstName ? createUserDto.firstName : 'User',
        lastName: createUserDto.lastName ? createUserDto.lastName : 'Cool',
        userName: createUserDto.userName ? createUserDto.userName : uuidv4(),
        role: Role.USER,
        hobbies: {
          [createUserDto.hobbies && 'connect']: createUserDto.hobbies.map(
            id => ({ id: +id }),
          ),
        },
      },
      include: {
        hobbies: true,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        hobbies: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getById(id: number): Promise<User> {
    const _user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        hobbies: true,
        favorites: true,
      },
    });

    if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  async getByEmail(email: string): Promise<User> {
    const _user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  async getByUserName(userName: string): Promise<User> {
    const _user = await this.prisma.user.findUnique({
      where: { userName },
    });

    if (!_user) throw new NotFoundException('User not found');

    return _user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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
            [updateUserDto.hobbies && 'connect']: updateUserDto.hobbies.map(
              id => ({ id }),
            ),
          },
        },
        include: {
          hobbies: {
            select: {
              name: true,
            },
          },
          favorites: {
            select: {
              name: true,
            },
          },
        },
      });
    }
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async toggle(id: number, dto: ToggleDto): Promise<User> {
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
      include: {
        hobbies: {
          select: {
            name: true,
          },
        },
        favorites: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
