import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from '@prisma/client';
import { TagSelect } from './returnTagObject';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createTagDto: CreateTagDto): Promise<TagSelect> {
    return this.tagService.create(createTagDto);
  }

  @Get('all')
  async getAll(): Promise<TagSelect[]> {
    return this.tagService.getAll();
  }

  @Get('by-type/:type')
  async getByType(@Param('type') type: string): Promise<TagSelect[]> {
    return this.tagService.getByType(type);
  }

  @Get(':shortname')
  async getByShortName(
    @Param('shortname') shortName: string,
  ): Promise<TagSelect> {
    return this.tagService.getByShortName(shortName);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }
}
