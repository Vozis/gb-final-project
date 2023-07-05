import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  EventParticipateNotification,
  FriendsNotification,
} from './dto/create-notification.dto';
import { UpdateNotificationStatusDto } from './dto/update-notification-status.dto';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { EventService } from '../event/event.service';
import { Server, Socket } from 'websocket-driver';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { UserWs } from '../auth/decorators/user-ws.decorator';
import { OnEvent } from '@nestjs/event-emitter';
import { EventSelect } from '../event/returnEventObject';
import { NotificationStatus, NotificationType, Comment } from '@prisma/client';
import { ENotificationType, INotificationResponse } from './notification.types';
import { UserSelect } from '../user/returnUserObject';
import { CommentSelect } from '../comment/returnCommentObject';

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  },
  transports: ['polling', 'websocket'],
})
export class NotificationGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getAllNotifications')
  async getAllNotifications(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const data = await this.notificationService.getUserNotifications(id);

    // console.log('allNotifications: ', data);

    client.emit('getAllNotifications', {
      notifications: data.result,
      count: data.count,
    });

    return data;
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('changeNotificationStatus')
  async changeNotificationStatus(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: UpdateNotificationStatusDto,
  ) {
    const data = await this.notificationService.updateNotificationStatus(dto);

    // console.log('delivered notifications: ', data);

    data.forEach(item => {
      // console.log(item);
      console.log(`user:${id}`);
      this.server.to(`user:${id}`).emit('removeNotification', { id: item });
    });

    return data;
  }

  // Events Events =============================================================
  @OnEvent(ENotificationType.CreateEventNote, { async: true })
  async handleEventCreate(eventCreate: EventSelect) {
    console.log('start create event notification');

    const userFriends = await this.userService.findUsersWhereFriends(
      eventCreate.creator.id,
    );

    for (const user of userFriends) {
      const createEventNotification: CreateNotificationDto = {
        userId: user.id,
        sourceId: eventCreate.id,
        type: NotificationType.EVENT_CREATE,
        status: NotificationStatus.SENT,
        text: `User ${eventCreate.creator.lastName} created new event ${eventCreate.name}`,
      };

      const notification =
        await this.notificationService.createOnlyNotification(
          createEventNotification,
        );

      const eventCreateNotification: INotificationResponse = {
        id: notification.id,
        type: notification.type,
        user: user,
        sourceId: notification.sourceId,
        sourceData: eventCreate.name,
        text: notification.text,
        createdAt: notification.createdAt,
      };

      console.log(
        `create notification for ${user.lastName}: event-create by ${eventCreate.creator.lastName}`,
      );

      this.server
        .to(`user:${user.id}`)
        .emit('getNotification', eventCreateNotification);
    }
  }

  @OnEvent(ENotificationType.UpdateEventNote, { async: true })
  async handleEventUpdate(eventUpdate: EventSelect) {
    console.log('start update event notification');
    // const updatedEvent = await this.eventService.getById(event.id);

    for (const participant of eventUpdate.users.filter(
      user => user.id !== eventUpdate.creator.id,
    )) {
      const updateEventDto: CreateNotificationDto = {
        userId: participant.id,
        sourceId: eventUpdate.id,
        type: NotificationType.EVENT_UPDATE,
        status: NotificationStatus.SENT,
        text: `Event ${eventUpdate.name} was updated`,
      };

      const notification =
        await this.notificationService.createOnlyNotification(updateEventDto);

      const eventUpdateNotification: INotificationResponse = {
        id: notification.id,
        type: notification.type,
        user: eventUpdate.creator,
        sourceId: notification.sourceId,
        sourceData: eventUpdate.name,
        text: notification.text,
        createdAt: notification.createdAt,
      };

      console.log(
        `create notification for ${participant.lastName}: event-update by ${eventUpdate.creator.lastName}`,
      );

      this.server
        .to(`user:${participant.id}`)
        .emit('getNotification', eventUpdateNotification);
    }
  }

  @OnEvent(ENotificationType.CompleteEventNote, { async: true })
  async handleEventComplete(eventComplete: EventSelect) {
    console.log('start complete event notification');
    // const completeEvent = await this.eventService.getById(event.id);

    for (const participant of eventComplete.users) {
      const completeEventDto: CreateNotificationDto = {
        userId: participant.id,
        sourceId: eventComplete.id,
        type: NotificationType.EVENT_COMPLETE,
        status: NotificationStatus.SENT,
        text: `Event ${eventComplete.name} CLOSED. Please estimate it`,
      };

      const notification =
        await this.notificationService.createOnlyNotification(completeEventDto);

      const eventCompleteNotification: INotificationResponse = {
        id: notification.id,
        type: notification.type,
        user: eventComplete.creator,
        sourceId: notification.sourceId,
        sourceData: eventComplete.name,
        text: notification.text,
        createdAt: notification.createdAt,
      };

      console.log(
        `create notification for ${participant.lastName}: event-complete by ${eventComplete.creator.lastName}`,
      );

      this.server
        .to(`user:${participant.id}`)
        .emit('getNotification', eventCompleteNotification);
    }
  }

  @OnEvent(ENotificationType.ParticipateEventNote, { async: true })
  async handleEventParticipate(data: EventParticipateNotification) {
    console.log('start event-participate notification');

    const userFriends = await this.userService.findUsersWhereFriends(data.id);
    const user = await this.userService.getById(data.id);

    for (const friend of userFriends) {
      const participateEventNotification: CreateNotificationDto = {
        userId: friend.id,
        sourceId: data.event.id,
        type: NotificationType.EVENT_PARTICIPATE,
        status: NotificationStatus.SENT,
        text: `${data.id} join the event ${data.event.name}`,
      };

      const notification =
        await this.notificationService.createOnlyNotification(
          participateEventNotification,
        );

      const eventParticipateNotification: INotificationResponse = {
        id: notification.id,
        type: notification.type,
        user: user,
        sourceId: notification.sourceId,
        sourceData: data.event.id.name,
        text: notification.text,
        createdAt: notification.createdAt,
      };

      console.log(
        `create notification for ${friend.lastName}: event-participate by ${user.lastName}`,
      );

      this.server
        .to(`user:${friend.id}`)
        .emit('getNotification', eventParticipateNotification);
    }
  }

  @OnEvent(ENotificationType.LeaveEventNote, { async: true })
  async handleEventLeave(data: EventParticipateNotification) {
    console.log('start event-leave notification');

    const userFriends = await this.userService.findUsersWhereFriends(data.id);

    const user = await this.userService.getById(data.id);

    for (const friend of userFriends) {
      const leaveEventNotification: CreateNotificationDto = {
        userId: friend.id,
        sourceId: data.event.id,
        type: NotificationType.EVENT_LEAVE,
        status: NotificationStatus.SENT,
        text: `${data.id} leave the event ${data.event.name}`,
      };

      // console.log(leaveEventNotification);

      const notification =
        await this.notificationService.createOnlyNotification(
          leaveEventNotification,
        );

      const eventLeaveNotification: INotificationResponse = {
        id: notification.id,
        type: notification.type,
        user: user,
        sourceId: notification.sourceId,
        sourceData: data.event.name,
        text: notification.text,
        createdAt: notification.createdAt,
      };

      console.log(
        `create notification for ${friend.lastName}: event-leave by ${user.lastName}`,
      );

      this.server
        .to(`user:${friend.id}`)
        .emit('getNotification', eventLeaveNotification);
    }
  }

  // Comment Events ============================================================

  @OnEvent(ENotificationType.CreateCommentNote, { async: true })
  async handleCreateComment(commentCreate: CommentSelect) {
    console.log('start create comment notification');
    // const eventWithNewComment = await this.eventService.getById(
    //   newComment.eventId,
    // );

    if (commentCreate.authorId !== commentCreate.event.creatorId) {
      const createCommentDto: CreateNotificationDto = {
        userId: commentCreate.event.creatorId,
        sourceId: commentCreate.id,
        type: NotificationType.COMMENT_CREATE,
        status: NotificationStatus.SENT,
        text: `User ${commentCreate.author.lastName} create a comment for event ${commentCreate.event.name}`,
      };
      const commentCreateNotification =
        await this.notificationService.createOnlyNotification(createCommentDto);

      const clientCreateNotification: INotificationResponse = {
        id: commentCreateNotification.id,
        type: commentCreateNotification.type,
        user: commentCreate.author,
        sourceId: commentCreateNotification.sourceId,
        sourceData: commentCreate.message,
        additionalData: commentCreate.event.name,
        moreData: commentCreate.event.id,
        text: commentCreateNotification.text,
        createdAt: commentCreateNotification.createdAt,
      };

      console.log(
        `create notification for ${commentCreate.event.creatorId}: create-comment by ${commentCreate.author.lastName}`,
      );

      // console.log('clientNotification: ', createCommentNotification);
      console.log(`event to ${commentCreate.event.creatorId}`);
      this.server
        .to(`user:${commentCreate.event.creatorId}`)
        .emit('getNotification', clientCreateNotification);
    }

    if (commentCreate.parentId) {
      if (commentCreate.author.id === commentCreate.parent.authorId) return;

      const replyCommentDto: CreateNotificationDto = {
        userId: commentCreate.parent.authorId,
        sourceId: commentCreate.id,
        type: NotificationType.COMMENT_REPLY,
        status: NotificationStatus.SENT,
        text: `User ${commentCreate.author.lastName} reply to your comment "${commentCreate.parent.message}" in event "${commentCreate.event.name}"`,
      };

      const replyCommentNotification =
        await this.notificationService.createOnlyNotification(replyCommentDto);

      const CommentReplyNotification: INotificationResponse = {
        id: replyCommentNotification.id,
        type: replyCommentNotification.type,
        user: commentCreate.author,
        sourceId: replyCommentNotification.sourceId,
        sourceData: commentCreate.message,
        additionalData: commentCreate.parent.message,
        moreData: commentCreate.event.id,
        text: replyCommentNotification.text,
        createdAt: replyCommentNotification.createdAt,
      };

      // console.log(CommentReplyNotification);

      console.log(
        `User ${commentCreate.author.lastName} reply to your comment ${commentCreate.parent.message} for event ${commentCreate.event.name}`,
      );

      console.log(`event to ${commentCreate.parent.authorId}`);
      this.server
        .to(`user:${commentCreate.parent.authorId}`)
        .emit('getNotification', CommentReplyNotification);
    }
  }

  @OnEvent(ENotificationType.DeleteCommentNote, { async: true })
  async handleDeleteComment(deleteComment: CommentSelect) {
    if (!deleteComment.parentId) {
      const result = await this.notificationService.deleteNotification(
        deleteComment.eventId,
        NotificationType.COMMENT_CREATE,
      );

      result.forEach(item => {
        this.server.to(item.userId).emit('removeNotification', item.id);
      });
    } else {
      const result = await this.notificationService.deleteNotification(
        deleteComment.parentId,
        NotificationType.COMMENT_REPLY,
      );
      result.forEach(item => {
        this.server.to(item.userId).emit('removeNotification', item.id);
      });
    }
  }

  // User Events ===============================================================

  @OnEvent(ENotificationType.AddFriendNote, { async: true })
  async handleAddFriend(data: FriendsNotification) {
    console.log('start add friend notification');

    // const user = await this.userService.getById(data.id);

    const addFriendDto: CreateNotificationDto = {
      userId: data.id,
      sourceId: data.user.id,
      type: NotificationType.FRIEND_ADD,
      status: NotificationStatus.SENT,
      text: `User ${data.user.lastName} add you to friends`,
    };

    const friendAddNotification =
      await this.notificationService.createOnlyNotification(addFriendDto);

    const friendAdd: INotificationResponse = {
      id: friendAddNotification.id,
      type: friendAddNotification.type,
      user: data.user,
      sourceId: friendAddNotification.sourceId,
      sourceData: '',
      text: friendAddNotification.text,
      createdAt: friendAddNotification.createdAt,
    };

    console.log(
      `create notification for ${data.id}: friend-add by ${data.user.lastName}`,
    );

    console.log(`event to ${data.id}`);
    this.server.to(`user:${data.id}`).emit('getNotification', friendAdd);
  }

  @OnEvent(ENotificationType.RemoveFriendNote, { async: true })
  async handleRemoveFriend(data: FriendsNotification) {
    console.log('start remove friend notification');

    // const user = await this.userService.getById(data.id);

    const removeFriendDto: CreateNotificationDto = {
      userId: data.id,
      sourceId: data.user.id,
      type: NotificationType.FRIEND_REMOVE,
      status: NotificationStatus.SENT,
      text: `User ${data.user.lastName} remove you from friends`,
    };

    const friendRemoveNotification =
      await this.notificationService.createOnlyNotification(removeFriendDto);

    const friendAdd: INotificationResponse = {
      id: friendRemoveNotification.id,
      type: friendRemoveNotification.type,
      user: data.user,
      sourceId: friendRemoveNotification.sourceId,
      sourceData: '',
      text: friendRemoveNotification.text,
      createdAt: friendRemoveNotification.createdAt,
    };

    console.log(
      `create notification for ${data.id}: friend-remove by ${data.user.lastName}`,
    );

    console.log(`event to ${data.id}`);
    this.server.to(`user:${data.id}`).emit('getNotification', friendAdd);
  }

  // Черновик ==================================================================

  // @SubscribeMessage('createNotification')
  // async createNotification(
  //   @MessageBody() dto: CreateNotificationDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   // console.log('create notification');
  //   const result = await this.notificationService.createNotification(dto);
  //
  //   // console.log('create user:', result.user.lastName);
  //
  //   this.server.to(result.user.id).emit('getNotification', result);
  //
  //   return result;
  // }
}
