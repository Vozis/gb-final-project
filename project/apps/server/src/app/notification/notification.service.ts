import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationStatusDto } from './dto/update-notification-status.dto';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { EventService } from '../event/event.service';
import { NotificationType } from '@prisma/client';
import { INotificationResponse } from './notification.types';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly eventService: EventService,
  ) {}

  async getUserNotifications(id: number) {
    // console.log('getAllUserNotifications');

    // console.log('id: ', id);

    const [notifications, count] = await this.prisma.$transaction([
      this.prisma.notifications.findMany({
        where: {
          userId: id,
          status: 'SENT',
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarPath: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.notifications.count({
        where: {
          userId: id,
          status: 'SENT',
        },
      }),
    ]);

    // console.log('notifications: ', notifications);

    const result = await Promise.all(
      notifications.map(async notification => {
        switch (notification.type) {
          case 'EVENT_CREATE':
            // console.log('event_create');
            const eventCreate = await this.eventService.getById(
              notification.sourceId,
            );
            // console.log('eventCreate', eventCreate.name);

            const eventCreateNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: eventCreate.creator,
              sourceId: notification.sourceId,
              sourceData: eventCreate.name,
              text: notification.text,
              createdAt: notification.createdAt,
            };
            return eventCreateNotification;
          case 'EVENT_UPDATE':
            // console.log('event_update');
            const eventUpdate = await this.eventService.getById(
              notification.sourceId,
            );
            // console.log('eventUpdate', eventUpdate);
            const eventUpdateNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: eventUpdate.creator,
              sourceId: notification.sourceId,
              sourceData: eventUpdate.name,
              text: notification.text,
              createdAt: notification.createdAt,
            };
            // console.log(eventUpdateNotification);
            return eventUpdateNotification;
          case 'EVENT_COMPLETE':
            // console.log('event_complete');
            const eventComplete = await this.eventService.getById(
              notification.sourceId,
            );
            // console.log('eventComplete', eventComplete.name);
            const eventCompleteNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: eventComplete.creator,
              sourceId: notification.sourceId,
              sourceData: eventComplete.name,
              text: notification.text,
              createdAt: notification.createdAt,
            };
            return eventCompleteNotification;
          case 'COMMENT_CREATE':
            // console.log('comment_create');
            const commentCreate = await this.commentService.getCommentById(
              notification.sourceId,
            );
            // console.log('commentCreate', commentCreate);
            const commentCreateNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: commentCreate.author,
              sourceId: commentCreate.id,
              sourceData: commentCreate.message,
              additionalData: commentCreate.event.name,
              moreData: commentCreate.event.id,
              text: notification.text,
              createdAt: notification.createdAt,
            };

            return commentCreateNotification;
          case 'EVENT_PARTICIPATE':
            // console.log('event_participate');
            const eventParticipate = await this.eventService.getById(
              notification.sourceId,
            );
            const userId = notification.text.split(':')[1];

            // console.log('EVENT_PARTICIPATE id: ', userId);
            const user = await this.userService.getById(+userId);

            const eventParticipateNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: user,
              sourceId: notification.sourceId,
              sourceData: eventParticipate.name,
              text: notification.text,
              createdAt: notification.createdAt,
            };
            return eventParticipateNotification;
          case 'EVENT_LEAVE':
            // console.log('event_leave');
            const eventLeave = await this.eventService.getById(
              notification.sourceId,
            );
            const _userId = notification.text.split(':')[1];

            // console.log('EVENT_LEAVE id: ', _userId);
            const _user = await this.userService.getById(+_userId);

            const eventLeaveNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: _user,
              sourceId: notification.sourceId,
              sourceData: eventLeave.name,
              text: notification.text,
              createdAt: notification.createdAt,
            };
            return eventLeaveNotification;
          case 'COMMENT_REPLY':
            // console.log('comment_reply');
            const commentReply = await this.commentService.getCommentById(
              notification.sourceId,
            );
            // console.log('commentReply', commentReply);
            const commentReplyNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: commentReply.author,
              sourceId: commentReply.id,
              sourceData: commentReply.message,
              additionalData: commentReply.parent.message,
              moreData: commentReply.event.id,
              text: notification.text,
              createdAt: notification.createdAt,
            };

            return commentReplyNotification;
          case 'FRIEND_ADD':
            // console.log('friend_add');
            const userFriend = await this.userService.getById(
              notification.sourceId,
            );
            // console.log('friend_add_user: ', userFriend.firstName);
            const friendAddNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: userFriend,
              sourceId: notification.sourceId,
              sourceData: '',
              text: notification.text,
              createdAt: notification.createdAt,
            };
            return friendAddNotification;
          case 'FRIEND_REMOVE':
            // console.log('friend_remove');
            const _userFriend = await this.userService.getById(
              notification.sourceId,
            );
            // console.log('friend_remove_user: ', _userFriend.firstName);
            const friendRemoveNotification: INotificationResponse = {
              id: notification.id,
              type: notification.type,
              user: _userFriend,
              sourceId: notification.sourceId,
              sourceData: '',
              text: notification.text,
              createdAt: notification.createdAt,
            };

            return friendRemoveNotification;
        }
      }),
    );

    // console.log('notification result: ', result);
    // console.log('count: ', count);

    return {
      result,
      count,
    };
  }

  async createOnlyNotification(dto: CreateNotificationDto) {
    return this.prisma.notifications.create({
      data: dto,
    });
  }

  async updateNotificationStatus(dto: UpdateNotificationStatusDto) {
    for (const id of dto.ids) {
      await this.prisma.notifications.updateMany({
        where: {
          id,
        },
        data: {
          status: dto.status,
        },
      });
    }
    return dto.ids;
  }

  async deleteNotification(id: number, type: NotificationType) {
    const notifications = await this.prisma.notifications.findMany({
      where: {
        sourceId: id,
        type: type,
      },
    });

    await this.prisma.notifications.deleteMany({
      where: {
        id: {
          in: notifications.map(item => item.id),
        },
      },
    });

    return notifications;
  }
}
