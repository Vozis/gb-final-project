import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeTagDto } from './dto/create-type-tag.dto';
import { UpdateTypeTagDto } from './dto/update-type-tag.dto';
import { returnTypeTagObject, TypeTag } from './returnTypeTagObject';
import { PrismaService } from '../prisma/prisma.service';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';

@Injectable()
export class TypeTagService {
  constructor(
    // @Inject('PrismaService')
    // private prisma: CustomPrismaService<ExtendedPrismaClient>,
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}
  async create(CreateTypeTagDto: CreateTypeTagDto): Promise<TypeTag> {
    return this.prisma.typeTag.create({
      data: {
        name: CreateTypeTagDto.name,
      },
      select: returnTypeTagObject,
    });
  }

  findAll(): Promise<TypeTag[]> {
    return this.prisma.typeTag.findMany({
      select: returnTypeTagObject,
    });
  }

  findOne(id: number): Promise<TypeTag> {
    return this.prisma.typeTag.findUnique({
      where: { id },
      select: returnTypeTagObject,
    });
  }

  update(id: number, updateTypeTagDto: UpdateTypeTagDto) {
    return this.prisma.typeTag.update({
      where: { id },
      data: {
        ...updateTypeTagDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.typeTag.delete({
      where: { id },
    });
  }
}
