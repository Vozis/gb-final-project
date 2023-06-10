import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeTagService } from './type-tag.service';
import { CreateTypeTagDto } from './dto/create-type-tag.dto';
import { UpdateTypeTagDto } from './dto/update-type-tag.dto';
import {Auth} from "../auth/decorators/auth.decorator";

@Controller('type-tag')
export class TypeTagController {
  constructor(private readonly typeTagService: TypeTagService) {}

  @Auth()
  @Post('/type_tag')
  create(@Body() createTypeTagDto: CreateTypeTagDto) {
    return this.typeTagService.create(createTypeTagDto);
  }

  @Get('/type_tag')
  findAll() {
    return this.typeTagService.findAll();
  }

  @Get('/type_tag/:id')
  findOne(@Param('id') id: string) {
    return this.typeTagService.findOne(+id);
  }

  @Patch('/type_tag/:id')
  update(@Param('id') id: string, @Body() updateTypeTagDto: UpdateTypeTagDto) {
    return this.typeTagService.update(+id, updateTypeTagDto);
  }

  @Delete('/type_tag/:id')
  remove(@Param('id') id: string) {
    return this.typeTagService.remove(+id);
  }
}
