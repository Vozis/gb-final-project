import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { EventService } from './event.service';
import { Server, Socket } from 'websocket-driver';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { UserWs } from '../auth/decorators/user-ws.decorator';
import { OnEvent } from '@nestjs/event-emitter';
import { EventSelect } from './returnEventObject';
import { NotificationStatus, NotificationType } from '@prisma/client';

import { UserSelect } from '../user/returnUserObject';
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { INotificationResponse } from '../notification/notification.types';

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  },
  transports: ['polling', 'websocket'],
})
export class EventGateway {
  @WebSocketServer() server: Server;
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @OnEvent('test')
  handleTest(payload) {
    console.log(payload);
  }

  // @OnEvent('eventCreate', { async: true })
  // async handleEventCreate(event: EventSelect) {
  //   const _users = await this.userService.findUsersWhereFriends(
  //     event.creator.id,
  //   );
  //
  //   for (const user of _users) {
  //     const dto: CreateNotificationDto = {
  //       userId: user.id,
  //       sourceId: event.id,
  //       type: NotificationType.EVENT_CREATE,
  //       status: NotificationStatus.SENT,
  //       text: `User ${event.creator.lastName} created new event ${event.name}`,
  //     };
  //
  //     const notification =
  //       await this.notificationService.createOnlyNotification(dto);
  //
  //     const clientNotification: INotificationResponse = {
  //       id: notification.id,
  //       type: notification.type,
  //       user: user,
  //       sourceId: notification.sourceId,
  //       sourceData: event.name,
  //       text: notification.text,
  //     };
  //
  //     console.log(
  //       `create notification for ${user.lastName}: event-create by ${event.creator.lastName}`,
  //     );
  //
  //     this.server.to(user.id).emit('getNotification', clientNotification);
  //   }
  // }

  // @OnEvent('eventUpdate')
  // async handleEventUpdate(event: EventSelect) {
  //   const _event = await this.eventService.getById(event.eventTime);
  //
  //   for (const user of _event.users) {
  //     const dto: CreateNotificationDto = {
  //       userId: user.id,
  //       sourceId: _event.id,
  //       type: NotificationType.EVENT_UPDATE,
  //       status: NotificationStatus.SENT,
  //       text: `Event ${_event.name} was updated`,
  //     };
  //
  //     const notification =
  //       await this.notificationService.createOnlyNotification(dto);
  //
  //     const clientNotification: INotificationResponse = {
  //       id: notification.id,
  //       type: notification.type,
  //       user: user,
  //       sourceId: notification.sourceId,
  //       sourceData: _event.name,
  //       text: notification.text,
  //     };
  //
  //     this.server.to(user.id).emit('getNotification', clientNotification);
  //   }
  // }

  // @OnEvent('eventComplete')
  // async handleEventComplete(event: EventSelect) {
  //   const _event = await this.eventService.getById(event.eventTime);
  //
  //   for (const user of _event.users) {
  //     const dto: CreateNotificationDto = {
  //       userId: user.id,
  //       sourceId: _event.id,
  //       type: NotificationType.EVENT_COMPLETE,
  //       status: NotificationStatus.SENT,
  //       text: `Event ${_event.name} CLOSED. Please estimate it`,
  //     };
  //
  //     const notification =
  //       await this.notificationService.createOnlyNotification(dto);
  //
  //     const clientNotification: INotificationResponse = {
  //       id: notification.id,
  //       type: notification.type,
  //       user: user,
  //       sourceId: notification.sourceId,
  //       sourceData: _event.name,
  //       text: notification.text,
  //     };
  //
  //     this.server.to(user.id).emit('getNotification', clientNotification);
  //   }
  // }

  // @UseGuards(WsJwtGuard)
  // @SubscribeMessage('getAllNotifications')
  // async getAllNotifications(
  //   @UserWs('id') id: number,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const data = await this.notificationService.getUserNotifications(id);
  //
  //   // console.log(data);
  //
  //   client.emit('getAllNotifications', {
  //     notifications: data.result,
  //     count: data.count,
  //   });
  //
  //   return data;
  // }
}
