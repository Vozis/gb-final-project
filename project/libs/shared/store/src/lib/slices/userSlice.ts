import { getStoreLocal } from '@project/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkAuth,
  getProfile,
  login,
  logout,
  register,
} from '../actions/userActions';
import { IUser } from '@project/shared/types';

export interface IInitialUserState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IInitialUserState = {
  user: getStoreLocal('user'),
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // toggleUserEvent: (state, action: PayloadAction<IEvent>) => {
    //   const isEventExist = state?.user?.events.some(
    //     event => event.id === action.payload.id,
    //   );
    //   console.log(isEventExist);
    //   // !isEventExist
    //   //   ? state?.user?.events.filter(event => event.id === action.payload.id)
    //   //   : state?.user?.events.push(action.payload);
    // },
    // toggleUserFriend: (state, action: PayloadAction<any>) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { reducer, actions } = userSlice;
