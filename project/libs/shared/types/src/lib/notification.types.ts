import { NotificationStatus, NotificationType } from '@prisma/client';
import { IEventUser, IUser } from '@project/shared/types';

export enum INotificationStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  ERROR = 'ERROR',
}

export interface INotification {
  id: number;
  type: NotificationType;
  user: IUser | IEventUser;
  sourceId: number;
  sourceData?: string | number;
  additionalData?: string | number;
  moreData?: string | number;
  text: string;
  createdAt: Date;
  status: INotificationStatus;
}

export interface INotificationUpdateStatus {
  ids: number[];
  status: NotificationStatus;
}

export enum NotificationEvent {
  GetAllNotifications = 'getAllNotifications',
  ReceiveAllNotifications = 'receiveAllNotifications',
  CreateNotification = 'createNotification',
  GetNotification = 'getNotification',
  RemoveNotification = 'removeNotification',
  UpdateNotification = 'updateNotification',
  ChangeNotificationStatus = 'changeNotificationStatus',
}

export interface IAllNotificationResponse {
  notifications: INotification[];
  count: number;
}

export interface IUpdateNotification {
  id: number;
  status: INotificationStatus;
}
