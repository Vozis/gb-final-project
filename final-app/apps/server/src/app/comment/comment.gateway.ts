import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Server, Socket } from 'websocket-driver';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { UserWs } from '../auth/decorators/user-ws.decorator';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventStatus } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  },
  transports: ['polling', 'websocket'],
})
export class CommentGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly eventService: EventService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('createComment')
  async create(
    @UserWs('id') id: number,
    @MessageBody() createCommentDto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const comment = await this.commentService.createComment(
      id,
      createCommentDto,
    );

    const _event = await this.eventService.getById(createCommentDto.eventId);
    if (_event.status !== EventStatus.CLOSED) {
      this.server.to(`room:${_event.id}`).emit('receiveComment', comment);
    } else {
      // Создать уведомление
    }
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

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('removeComment')
  remove(
    @MessageBody() removeDto: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('deleteComment', removeDto.id);
    return this.commentService.deleteComment(removeDto.id);
  }
}
