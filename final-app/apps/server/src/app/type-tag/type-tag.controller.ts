import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypeTagService } from './type-tag.service';
import { CreateTypeTagDto } from './dto/create-type-tag.dto';
import { UpdateTypeTagDto } from './dto/update-type-tag.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('type-tag')
export class TypeTagController {
  constructor(private readonly typeTagService: TypeTagService) {}

  @Auth()
  @Post('')
  create(@Body() createTypeTagDto: CreateTypeTagDto) {
    return this.typeTagService.create(createTypeTagDto);
  }

  @Get('')
  findAll() {
    return this.typeTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeTagDto: UpdateTypeTagDto) {
    return this.typeTagService.update(+id, updateTypeTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeTagService.remove(+id);
  }
}
