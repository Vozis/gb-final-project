import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import _ from 'lodash';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'websocket-driver';
import { activeRooms, onlineUsers } from '../constants/online-users';
import { UserService } from './user/user.service';
import { WsJwtGuard } from './auth/guards/ws-jwt.guard';
import { UserWs } from './auth/decorators/user-ws.decorator';
import { EventService } from './event/event.service';

@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  },
  transports: ['polling', 'websocket'],
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getActiveRooms')
  async getMyActiveRooms(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const _user = await this.userService.getById(id);

    const userRooms = _user.events.filter(event => event.status !== 'CLOSED');

    userRooms.forEach(room => {
      client.join(`room:${room.id}`);
    });

    client.emit(
      'sendActiveRooms',
      userRooms.map(room => ({
        name: `room:${room.id}`,
      })),
    );
    return userRooms;
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('toggleUserEventParticipate')
  async toggleUserEventParticipate(
    @UserWs('id') id: number,
    @MessageBody() dto: { eventId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const _event = await this.eventService.getById(dto.eventId, id);

    if (_event.isParticipate) {
      _.remove(activeRooms[dto.eventId], item => item === id);
      if (activeRooms[dto.eventId] && activeRooms[dto.eventId].length === 0) {
        delete activeRooms[dto.eventId];
        // this.server.of('/').adapter.on('delete-room', room => {
        //   console.log(`room ${room} was deleted`);
        // });
      }
      // console.log('activeRooms after remove', activeRooms);
      client.emit('removeActiveRoom', { room: `room:${dto.eventId}` });
    } else {
      if (!activeRooms[dto.eventId]) activeRooms[dto.eventId] = [];
      activeRooms[dto.eventId].push(id);
      // console.log('activeRooms after add', activeRooms);
      client.emit('addActiveRoom', { room: `room:${dto.eventId}` });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getOnlineUserList')
  async getOnlineUserList(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('sendOnlineUserList', Object.keys(onlineUsers));
    return onlineUsers;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleConnection(client: Socket, ...args) {
    const { userId } = client.handshake.query;

    if (!onlineUsers[+userId]) onlineUsers[+userId] = [];
    onlineUsers[+userId].push(client.id);

    client.join(`user:${userId}`);

    this.logger.log(`join user:${userId}`);

    if (onlineUsers[+userId].length === 1) {
      this.server.emit('getOnlineUser', userId);
    }

    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const { userId } = client.handshake.query;

    client.leave(userId);

    _.remove(onlineUsers[+userId], item => item === client.id);
    if (onlineUsers[+userId] && onlineUsers[+userId].length === 0) {
      console.log(`user ${userId} offline`);
      this.server.emit('removeOnlineUser', userId);
      delete onlineUsers[+userId];
      await this.userService.updateExitDate(+userId);
    }

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
