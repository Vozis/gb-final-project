import { IOnlineSocketUser, IUserActiveRooms } from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  onlineUsers: IOnlineSocketUser[];
  activeRooms: IUserActiveRooms[];
}

const initialState: IInitialSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  onlineUsers: [],
  activeRooms: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: state => {
      state.isEstablishingConnection = true;
      state.isConnected = true;
    },
    disconnect: state => {
      state.isEstablishingConnection = false;
      state.isConnected = false;
    },
    getOnlineUsersList: (
      state,
      action: PayloadAction<{
        onlineUsersList: IOnlineSocketUser[];
      }>,
    ) => {
      state.onlineUsers = action.payload.onlineUsersList;
    },
    getUserOnline: (
      state,
      action: PayloadAction<{ onlineUser: IOnlineSocketUser }>,
    ) => {
      state.onlineUsers.push(action.payload.onlineUser);
    },
    removeUserOnline: (state, action) => {
      const newArray = state.onlineUsers.filter(
        userId => userId !== action.payload,
      );
      state.onlineUsers = newArray;
    },
    getUserActiveRooms: (
      state,
      action: PayloadAction<{ rooms: IUserActiveRooms[] }>,
    ) => {
      state.activeRooms = action.payload.rooms;
    },
    addActiveRoom: (
      state,
      action: PayloadAction<{ room: IUserActiveRooms }>,
    ) => {
      state.activeRooms.push(action.payload.room);
    },
    removeActiveRoom: (
      state,
      action: PayloadAction<{ room: IUserActiveRooms }>,
    ) => {
      const newArr = state.activeRooms.filter(
        activeRoom => activeRoom.name !== action.payload.room.name,
      );

      state.activeRooms = newArr;
    },
    submitToggleRoom: (
      state,
      action: PayloadAction<{
        eventId: number;
      }>,
    ) => {
      return;
    },
  },
});

export const { reducer, actions } = socketSlice;
