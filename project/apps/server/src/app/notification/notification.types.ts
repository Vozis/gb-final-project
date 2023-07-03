import { NotificationType } from '@prisma/client';
import { UserSelect } from '../user/returnUserObject';

export interface INotificationResponse {
  id: number;
  type: NotificationType;
  user: INotificationUser | UserSelect;
  sourceId: number;
  sourceData?: string | number;
  additionalData?: string | number;
  moreData?: string | number;
  text: string;
}

export interface INotificationUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  avatarPath: string;
}

export enum ENotificationType {
  CreateEventNote = 'createEventNotification',
  UpdateEventNote = 'updateEventNotification',
  CompleteEventNote = 'completeEventNotification',
  ParticipateEventNote = 'participateEventNotification',
  LeaveEventNote = 'leaveEventNotification',
  CreateCommentNote = 'createCommentNotification',
  DeleteCommentNote = 'deleteCommentNotification',
  AddFriendNote = 'addFriendNotification',
  RemoveFriendNote = 'removeFriendNotification',
}
