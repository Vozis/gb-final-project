import { IEventUser, IUser } from '@project/shared/types';

export enum EnumNotificationStatusFront {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  ERROR = 'ERROR',
}

export enum EnumNotificationStatus {
  COMMENT_REPLY= 'COMMENT_REPLY',
  COMMENT_CREATE= 'COMMENT_CREATE',
  EVENT_CREATE= 'EVENT_CREATE',
  EVENT_UPDATE= 'EVENT_UPDATE',
  EVENT_COMPLETE= 'EVENT_COMPLETE',
  FRIEND_ADD= 'FRIEND_ADD',
  FRIEND_REMOVE= 'FRIEND_REMOVE',
  EVENT_PARTICIPATE='EVENT_PARTICIPATE',
  EVENT_LEAVE= 'EVENT_LEAVE'
}

export enum EnumNotificationType {
  COMMENT_REPLY= 'COMMENT_REPLY',
  COMMENT_CREATE= 'COMMENT_CREATE',
  EVENT_CREATE= 'EVENT_CREATE',
  EVENT_UPDATE= 'EVENT_UPDATE',
  EVENT_COMPLETE= 'EVENT_COMPLETE',
  FRIEND_ADD= 'FRIEND_ADD',
  FRIEND_REMOVE= 'FRIEND_REMOVE',
  EVENT_PARTICIPATE= 'EVENT_PARTICIPATE',
  EVENT_LEAVE= 'EVENT_LEAVE'
}



export interface INotification {
  id: number;
  type: EnumNotificationType;
  user: IUser | IEventUser;
  sourceId: number;
  sourceData?: string | number;
  additionalData?: string | number;
  moreData?: string | number;
  text: string;
  createdAt: Date;
  status: EnumNotificationStatusFront;
}

export interface INotificationUpdateStatus {
  ids: number[];
  status: EnumNotificationStatusFront;
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
  status: EnumNotificationStatusFront;
}
