import { io, Socket } from 'socket.io-client';
import { Middleware } from '@reduxjs/toolkit';
import { actions as commentActions } from '../slices/commentSlice';
import { actions as socketActions } from '../slices/socketSlice';
import { actions as notificationActions } from '../slices/notificationSlice';

import {
  CommentEvent,
  IAllNotificationResponse,
  IComment,
  ICommentPayload,
  INotification,
  IOnlineSocketUser,
  IUserActiveRooms,
  NotificationEvent,
  SocketEvent,
} from '@project/shared/types';
import Cookies from 'js-cookie';
import { NotificationStatus, NotificationType } from '@prisma/client';
import { login } from '../actions/userActions';
import { toast } from 'react-toastify';

const socketMiddleware: Middleware = store => {
  let socket: Socket;
  let userId;

  // console.log('start comment middleware');

  return next => action => {
    const isConnectionEstablished =
      socket && store.getState().socket.isConnected;

    // console.log('isConnectionEstablished: ', isConnectionEstablished);

    // console.log(commentActions.startConnecting.match(action));
    // console.log('action: ', action);

    if (socketActions.startConnecting.match(action)) {
      userId = store.getState().user.user.id;
      socket = io('http://localhost:3000', {
        withCredentials: true,
        query: { userId: userId },
        transports: ['websocket', 'polling'],
      });

      // Connecting events =====================================================

      socket.on('connect', () => {
        store.dispatch(socketActions.connectionEstablished());
        socket.emit(SocketEvent.GetOnlineUserList);
        socket.emit(SocketEvent.GetActiveRooms);
        socket.emit(CommentEvent.GetAllComments);
        socket.emit(NotificationEvent.GetAllNotifications);
      });

      // Online users events ===================================================

      socket.on(
        SocketEvent.SendOnlineUserList,
        (onlineUsersList: IOnlineSocketUser[]) => {
          store.dispatch(socketActions.getOnlineUsersList({ onlineUsersList }));
        },
      );

      socket.on(SocketEvent.GetOnlineUser, (onlineUser: IOnlineSocketUser) => {
        store.dispatch(socketActions.getUserOnline({ onlineUser }));
      });

      socket.on(SocketEvent.RemoveOnlineUser, (userId: string) => {
        store.dispatch(socketActions.removeUserOnline(userId));
      });

      // Active rooms events ===================================================

      socket.on(SocketEvent.SendActiveRooms, (rooms: IUserActiveRooms[]) => {
        store.dispatch(socketActions.getUserActiveRooms({ rooms }));
      });

      socket.on(SocketEvent.AddActiveRoom, (room: IUserActiveRooms) => {
        store.dispatch(socketActions.addActiveRoom({ room }));
      });

      socket.on(SocketEvent.RemoveActiveRoom, (room: IUserActiveRooms) => {
        store.dispatch(socketActions.removeActiveRoom({ room }));
      });

      // Comment events ========================================================

      socket.on(CommentEvent.SendAllComments, (allComments: IComment[]) => {
        store.dispatch(commentActions.receiveAllComments({ allComments }));
      });

      socket.on(CommentEvent.ReceiveComment, (comment: IComment) => {
        store.dispatch(commentActions.receiveComment({ comment }));
      });

      socket.on(CommentEvent.DeleteComment, (id: number) => {
        store.dispatch(commentActions.deleteComment({ id }));
      });

      // Notification events =====================================================

      socket.on(
        NotificationEvent.GetAllNotifications,
        (data: IAllNotificationResponse) => {
          console.log('allNotifications: ', data);

          store.dispatch(notificationActions.receiveAllNotifications(data));
        },
      );

      socket.on(
        NotificationEvent.GetNotification,
        (notification: INotification) => {
          console.log('new notification: ', notification);

          store.dispatch(
            notificationActions.receiveNotification({ notification }),
          );
        },
      );

      socket.on(NotificationEvent.RemoveNotification, (id: number) => {
        console.log(id);
        store.dispatch(notificationActions.removeNotification({ id }));
      });
    }

    if (
      notificationActions.changeEventStatus.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(
        NotificationEvent.ChangeNotificationStatus,
        action.payload.dto,
      );
    }

    if (
      socketActions.submitToggleRoom.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(SocketEvent.ToggleUserEventParticipate, action.payload);
    }

    if (commentActions.submitComment.match(action) && isConnectionEstablished) {
      socket.emit(CommentEvent.CreateComment, action.payload);
    }

    if (
      commentActions.submitCommentDelete.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(CommentEvent.RemoveComment, action.payload);
    }

    next(action);
  };
};

export default socketMiddleware;
