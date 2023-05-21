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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
        firstName: '',
        lastName: '',
        userName: '',
        role: Role.USER,
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
        },
      });
    }
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
