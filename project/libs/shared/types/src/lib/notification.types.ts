import { NotificationStatus, NotificationType } from '@prisma/client';
import { IEventUser, IUser } from '@project/shared/types';

export interface INotification {
  id: number;
  type: NotificationType;
  user: IUser | IEventUser;
  sourceId: number;
  sourceData?: string | number;
  additionalData?: string | number;
  moreData?: string | number;
  text: string;
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
  ChangeNotificationStatus = 'changeNotificationStatus',
}

export interface IAllNotificationResponse {
  notifications: INotification[];
  count: number;
}
