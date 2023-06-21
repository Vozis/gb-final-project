import { ETypeConnect, IComment } from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialCommentState {
  // connect: ETypeConnect;
  isEstablishingConnection: boolean;
  isConnected: boolean;
  comments: IComment[];
}

const initialState: IInitialCommentState = {
  // connect: ETypeConnect.DISCONNECT,
  isEstablishingConnection: false,
  isConnected: false,
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: state => {
      state.isEstablishingConnection = true;
      state.isConnected = true;
      // state.connect = ETypeConnect.CONNECT;
    },
    receiveAllComments: (
      state,
      action: PayloadAction<{
        comments: IComment[];
      }>,
    ) => {
      state.comments = action.payload.comments;
    },
    receiveComment: (
      state,
      action: PayloadAction<{
        comment: IComment;
      }>,
    ) => {
      state.comments.push(action.payload.comment);
    },
    submitComment: (
      state,
      action: PayloadAction<{
        message: string;
      }>,
    ) => {
      return;
    },
    disconnect: state => {
      // state.connect = ETypeConnect.DISCONNECT;
      state.isEstablishingConnection = false;
      state.isConnected = false;
    },
  },
});
export const { reducer, actions } = commentSlice;
