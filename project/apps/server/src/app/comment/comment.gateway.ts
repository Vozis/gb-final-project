import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Server, Socket } from 'websocket-driver';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { UserWs } from '../auth/decorators/user-ws.decorator';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import _ from 'lodash';

const onlineUsers = {};

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  },
  namespace: 'comments',
  transports: ['polling', 'websocket'],
})
export class CommentGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('createComment')
  async create(
    @UserWs('id') id: number,
    @MessageBody() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.createComment(
      id,
      createCommentDto,
    );

    this.server.emit('receiveComment', comment);
    // return this.commentService.create(createCommentDto);
  }
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getAllComments')
  async getAllComments(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const comments = await this.commentService.getAllUserComments(id);
    // console.log(comments);
    client.emit('sendAllComments', comments);
    return comments;
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

  // @UseGuards(WsJwtGuard)
  // @SubscribeMessage('getCommentsToEvent')
  // async getCommentsToEvent(
  //   @UserWs('id') id: number,
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() eventId: number,
  // ) {
  //   const comments = await this.commentService.getAllToEvent(id, eventId);
  //   // console.log(comments);
  //   client.emit('sendCommentsToEvent', comments);
  //   return comments;
  // }

  // @UseGuards(WsJwtGuard)
  // @SubscribeMessage('getUnreadComments')
  // async getUnreadComments(
  //   @UserWs('id') id: number,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const comments = await this.commentService.getUnreadComments(id);
  //   // console.log(comments);
  //   client.emit('sendUnreadComments', comments);
  //   return comments;
  // }

  // @SubscribeMessage('findOneComment')
  // findOne(@MessageBody() id: number) {
  //   // return this.commentService.findOne(id);
  // }
  //
  // @SubscribeMessage('updateComment')
  // update(@MessageBody() updateCommentDto: UpdateCommentDto) {
  //   // return this.commentService.update(updateCommentDto.id, updateCommentDto);
  // }
  //
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('removeComment')
  remove(
    @MessageBody() removeDto: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('deleteComment', removeDto.id);
    return this.commentService.deleteComment(removeDto.id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleConnection(client: Socket, ...args) {
    const { userId } = client.handshake.query;

    if (!onlineUsers[+userId]) onlineUsers[+userId] = [];
    onlineUsers[+userId].push(client.id);

    if (onlineUsers[+userId].length === 1) {
      this.server.emit('getOnlineUser', userId);
    }

    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const { userId } = client.handshake.query;

    // onlineUsers[+userId].filter(item => item !== client.id);
    _.remove(onlineUsers[+userId], item => item === client.id);
    if (onlineUsers[+userId].length === 0) {
      console.log(`user ${userId} offline`);
      this.server.emit('removeOnlineUser', userId);
      delete onlineUsers[+userId];
      await this.userService.updateExitDate(+userId);
    }

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
