import { Injectable } from '@nestjs/common';
import { CreateTypeTagDto } from './dto/create-type-tag.dto';
import { UpdateTypeTagDto } from './dto/update-type-tag.dto';
import { returnTypeTagObject, TypeTag } from './returnTypeTagObject';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TypeTagService {
  constructor(private readonly prisma: PrismaService) {}
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

  update(id: number, updateTypeTagDto: UpdateTypeTagDto): Promise<TypeTag> {
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
