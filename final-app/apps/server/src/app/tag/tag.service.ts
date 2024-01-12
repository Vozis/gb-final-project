import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';
import { returnTagObject, TagSelect } from './returnTagObject';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';

@Injectable()
export class TagService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>, // @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<TagSelect> {
    const _tag = await this.prisma.client.tag.findUnique({
      where: {
        shortName: createTagDto.shortName,
      },
    });

    if (_tag) throw new BadRequestException('Tag already exists');

    return this.prisma.client.tag.create({
      data: {
        name: createTagDto.name,
        shortName: createTagDto.shortName,
        type: {
          connect: {
            id: createTagDto.typeId,
          },
        },
      },
      select: returnTagObject,
    });
  }

  async getAll(): Promise<TagSelect[]> {
    return this.prisma.client.tag.findMany({
      select: returnTagObject,
    });
  }

  async getByType(type: string): Promise<TagSelect[]> {
    const isExistTag = await this.prisma.client.tag
      .findFirst({
        where: {
          type: {
            name: type,
          },
        },
      })
      .then(Boolean);

    if (!isExistTag) throw new BadRequestException('Type does not exist');

    return this.prisma.client.tag.findMany({
      where: {
        type: {
          name: type,
        },
      },
      select: returnTagObject,
    });
  }

  async getByShortName(shortName: string): Promise<TagSelect> {
    const isExistTag = await this.prisma.client.tag
      .findUnique({
        where: {
          shortName,
        },
      })
      .then(Boolean);

    if (!isExistTag) throw new BadRequestException('Tag does not exist');

    return this.prisma.client.tag.findUnique({
      where: { shortName },
      select: returnTagObject,
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    if (updateTagDto.shortName) {
      const _tag = await this.prisma.client.tag.findUnique({
        where: { shortName: updateTagDto.shortName },
      });

      if (_tag) throw new BadRequestException('Tag already exists');
      return this.prisma.client.tag.update({
        where: { id },
        data: {
          ...updateTagDto,
        },
      });
    } else {
      return this.prisma.client.tag.update({
        where: { id },
        data: {
          ...updateTagDto,
        },
      });
    }
  }

  async delete(id: number): Promise<Tag> {
    return this.prisma.client.tag.delete({
      where: { id },
    });
  }
}
