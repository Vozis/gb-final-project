import { IEvent } from '@project/shared/types';
import { createSlice } from '@reduxjs/toolkit';
import { getFinishedEvents } from '../actions/notificationActions';

export interface IInitialNotificationState {
  isLoading: boolean;
  finishedEvents: IEvent[];
}

const initialState: IInitialNotificationState = {
  isLoading: false,
  finishedEvents: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFinishedEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(getFinishedEvents.rejected, (state, action) => {
        return initialState;
      })
      .addCase(getFinishedEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.finishedEvents = action.payload;
      });
  },
});

export const { reducer } = notificationSlice;
