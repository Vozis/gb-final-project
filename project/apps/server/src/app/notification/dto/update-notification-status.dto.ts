import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { NotificationStatus } from '@prisma/client';

export class UpdateNotificationStatusDto {
  // @IsNumber({}, {})
  @IsArray()
  ids: [number];

  @IsString({})
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}
