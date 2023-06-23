import { IOnlineSocketUser } from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  onlineUsers: IOnlineSocketUser[];
}

const initialState: IInitialSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  onlineUsers: [],
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
  },
});

export const { reducer, actions } = socketSlice;
