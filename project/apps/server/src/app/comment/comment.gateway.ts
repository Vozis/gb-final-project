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
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { UserWs } from '../auth/decorators/user-ws.decorator';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
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

  constructor(private readonly commentService: CommentService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('createComment')
  async create(
    @ConnectedSocket() client: Socket,
    @UserWs('id') id: number,
    @MessageBody() createCommentDto: CreateCommentDto,
  ) {
    const { eventId } = client.handshake.query;
    const comment = await this.commentService.createComment(
      id,
      +eventId,
      createCommentDto,
    );

    console.log('comment: ', comment);

    this.server.sockets.emit('receiveComment', comment);
    // return this.commentService.create(createCommentDto);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getAllComments')
  async getAllComments(
    @UserWs('id') id: number,
    @ConnectedSocket() client: Socket,
  ) {
    // const { eventId } = client.handshake.query;
    const comments = await this.commentService.getAllToEvent(26);

    client.emit('sendAllComments', comments);
    return comments;
  }

  @SubscribeMessage('findOneComment')
  findOne(@MessageBody() id: number) {
    // return this.commentService.findOne(id);
  }

  @SubscribeMessage('updateComment')
  update(@MessageBody() updateCommentDto: UpdateCommentDto) {
    // return this.commentService.update(updateCommentDto.id, updateCommentDto);
  }

  @SubscribeMessage('removeComment')
  remove(@MessageBody() id: number) {
    // return this.commentService.remove(id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args) {
    // const { newsId } = client.handshake.query;
    // client.join(newsId);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
