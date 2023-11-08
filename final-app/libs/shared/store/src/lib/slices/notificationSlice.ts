import {
  INotification,
  INotificationStatus,
  INotificationUpdateStatus,
} from '@project/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';

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
      state.notifications.unshift(action.payload.notification);
      state.count++;
      // toast.success(action.payload.notification.text, {
      //   toastId: 'get-notification',
      //   containerId: 1,
      // });
      toast.success(action.payload.notification.text.split(':')[0], {
        id: 'get-notification',
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
    updateNotification: (
      state,
      action: PayloadAction<{
        id: number;
        status: INotificationStatus;
      }>,
    ) => {
      const updatedNotification = state.notifications.find(
        el => el.id === action.payload.id,
      );

      if (updatedNotification) {
        updatedNotification.status = action.payload.status;
        state.count--;
      }
    },
    resetNotificationState: state => {
      return initialState;
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
