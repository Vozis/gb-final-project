import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto, userId?: number): Promise<Tag> {
    const _tag = await this.prisma.tag.findUnique({
      where: {
        shortName: createTagDto.shortName,
      },
    });

    if (_tag) throw new BadRequestException('Tag already exists');

    if (userId) {
      return this.prisma.tag.create({
        data: {
          name: createTagDto.name,
          shortName: createTagDto.shortName,
          type: createTagDto.type,
        },
      });
    } else {
      return this.prisma.tag.create({
        data: {
          name: createTagDto.name,
          shortName: createTagDto.shortName,
          type: createTagDto.type,
        },
      });
    }
  }

  async getAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }

  async getByType(type: string): Promise<Tag[]> {
    const _tag = await this.prisma.tag.findFirst({
      where: {
        type,
      },
    });

    if (!_tag) throw new BadRequestException('Tag does not exist');

    return this.prisma.tag.findMany({
      where: { type },
    });
  }

  async getByShortName(shortName: string): Promise<Tag> {
    const _tag = await this.prisma.tag.findUnique({
      where: {
        shortName,
      },
    });

    if (!_tag) throw new BadRequestException('Tag does not exist');

    return this.prisma.tag.findUnique({
      where: { shortName },
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    if (updateTagDto.shortName) {
      const _tag = await this.prisma.tag.findUnique({
        where: { shortName: updateTagDto.shortName },
      });

      if (_tag) throw new BadRequestException('Tag already exists');
      return this.prisma.tag.update({
        where: { id },
        data: {
          ...updateTagDto,
        },
      });
    } else {
      return this.prisma.tag.update({
        where: { id },
        data: {
          ...updateTagDto,
        },
      });
    }
  }

  async delete(id: number): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
