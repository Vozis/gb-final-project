import {
  IComment,
  IEvent,
  INotification,
  INotificationUpdateStatus,
} from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFinishedEvents } from '../actions/notificationActions';
import { toast } from 'react-toastify';

export interface IInitialNotificationState {
  isLoading: boolean;
  notifications: INotification[];
  count: number;
}

const initialState: IInitialNotificationState = {
  isLoading: false,
  notifications: [],
  count: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    receiveAllNotifications: (
      state,
      action: PayloadAction<{
        notifications: INotification[];
        count: number;
      }>,
    ) => {
      state.notifications = action.payload.notifications;
      state.count = action.payload.count;
    },
    receiveNotification: (
      state,
      action: PayloadAction<{
        notification: INotification;
      }>,
    ) => {
      state.notifications.push(action.payload.notification);
      state.count++;
      toast.success(action.payload.notification.text, {
        toastId: 'get-notification',
        containerId: 1,
      });
    },
    changeNotificationStatus: (
      state,
      action: PayloadAction<{
        dto: INotificationUpdateStatus;
      }>,
    ) => {
      return;
    },
    removeNotification: (state, action: PayloadAction<{ id: number }>) => {
      const newArr = state.notifications.filter(
        notification => notification.id !== action.payload.id,
      );
      state.notifications = newArr;
      state.count--;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(getFinishedEvents.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getFinishedEvents.rejected, (state, action) => {
  //       return initialState;
  //     })
  //     .addCase(getFinishedEvents.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.notifications = action.payload;
  //     });
  // },
});

export const { reducer, actions } = notificationSlice;
