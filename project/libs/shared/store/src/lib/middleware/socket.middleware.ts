import { io, Socket } from 'socket.io-client';
import { Middleware } from '@reduxjs/toolkit';
import { actions as commentActions } from '../slices/commentSlice';
import { useActions, useCommentState } from '@project/shared/hooks';
import { CommentEvent, IComment } from '@project/shared/types';

// let socket: Socket;

export const commentMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished =
      socket && store.getState().comments.isConnected;

    if (commentActions.startConnecting.match(action)) {
      socket = io('http://localhost:3000/comments', {
        withCredentials: true,
        // autoConnect: false,
        // transports: ['websocket', 'polling'],
      });

      socket.on('connect', () => {
        store.dispatch(commentActions.connectionEstablished());
        socket.emit(CommentEvent.GetAllComments);
      });

      socket.on(CommentEvent.SendAllComments, (comments: IComment[]) => {
        store.dispatch(commentActions.receiveAllComments({ comments }));
      });

      socket.on(CommentEvent.SendComment, (comment: IComment) => {
        store.dispatch(commentActions.receiveComment({ comment }));
      });
    }

    if (commentActions.submitComment.match(action) && isConnectionEstablished) {
      socket.emit(CommentEvent.SendComment, action.payload.message);
    }

    next(action);
  };
};
