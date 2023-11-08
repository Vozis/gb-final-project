export interface ISocket {
  socketId: string;
}

export interface IOnlineSocketUser {
  userId: string;
}

export interface IUserActiveRooms {
  name: string;
}

export enum SocketEvent {
  GetOnlineUserList = 'getOnlineUserList',
  SendOnlineUserList = 'sendOnlineUserList',
  GetOnlineUser = 'getOnlineUser',
  SendOnlineUser = 'sendOnlineUser',
  RemoveOnlineUser = 'removeOnlineUser',
  GetActiveRooms = 'getActiveRooms',
  SendActiveRooms = 'sendActiveRooms',
  AddActiveRoom = 'addActiveRoom',
  RemoveActiveRoom = 'removeActiveRoom',
  ToggleUserEventParticipate = 'toggleUserEventParticipate',
}
