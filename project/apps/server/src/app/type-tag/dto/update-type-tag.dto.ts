import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeTagDto } from './create-type-tag.dto';

export class UpdateTypeTagDto extends PartialType(CreateTypeTagDto) {}
