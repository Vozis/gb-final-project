import { IsArray, IsEnum, IsString } from 'class-validator';
import { NotificationStatus } from '@prisma/client';

export class UpdateNotificationStatusDto {
  // @IsNumber({}, {})
  @IsArray()
  ids: [number];

  @IsString({})
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}
