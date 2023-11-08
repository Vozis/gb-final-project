import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NotificationStatus, NotificationType } from '@prisma/client';
import { UserSelect } from '../../user/returnUserObject';
import { INotificationUser } from '../notification.types';

export class CreateNotificationDto {
  @IsString({})
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNumber({}, { message: 'SourceId must be a number' })
  sourceId: number;

  @IsNumber({}, { message: 'UserId must be a number' })
  userId: number;

  @IsString({ message: 'Text must be a string' })
  @IsOptional()
  text: string;

  @IsString({ message: 'status must be a string' })
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}

export interface FriendsNotification {
  user: UserSelect | INotificationUser;
  id: number;
}

export interface EventParticipateNotification {
  event: any;
  id: number;
}
