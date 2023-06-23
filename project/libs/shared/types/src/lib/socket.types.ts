export interface ISocket {
  socketId: string;
}

export interface IOnlineSocketUser {
  userId: string;
}

export enum SocketEvent {
  GetOnlineUserList = 'getOnlineUserList',
  SendOnlineUserList = 'sendOnlineUserList',
  GetOnlineUser = 'getOnlineUser',
  SendOnlineUser = 'sendOnlineUser',
  RemoveOnlineUser = 'removeOnlineUser',
}
