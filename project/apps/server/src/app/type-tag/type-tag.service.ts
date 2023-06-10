import { Injectable } from '@nestjs/common';
import { CreateTypeTagDto } from './dto/create-type-tag.dto';
import { UpdateTypeTagDto } from './dto/update-type-tag.dto';
import {returnTypeTagObject, TypeTag } from './typeTagDto';

@Injectable()
export class TypeTagService {
  async create(
    CreateTypeTagDto: CreateTypeTagDto,
  ): Promise<TypeTag> {
    return this.prisma.event.create({
      data: {
        name: CreateTypeTagDto.name
      },
      select: returnTypeTagObject,
    });
  }

  findAll(): Promise<TypeTag[]> {
    return this.prisma.event.findAll({
      select: returnTypeTagObject,
    });
  }

  findOne(id: number): Promise<TypeTag>  {
    return this.prisma.event.findAll({
      where: { id },
      select: returnTypeTagObject,
    });
  }

  update(id: number, updateTypeTagDto: UpdateTypeTagDto): Promise<TypeTag>
  {
    return this.prisma.tag.update({
      where: { id },
      data: {
        ...updateTypeTagDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
