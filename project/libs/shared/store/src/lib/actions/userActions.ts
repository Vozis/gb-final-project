import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, ILogin, IUser } from '@project/shared/types';
import { AuthService, UserService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

export const register = createAsyncThunk<IAuthResponse, FormData>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.register(data);
      // toast.success('Регистрация прошла успешно', {
      //   toastId: 'register-success',
      //   containerId: 1,
      // });
      toast.success('Регистрация прошла успешно', {
        id: 'register-success',
      });

      // toast.info('На указанный email отправлено сообщение для подтверждения', {
      //   toastId: 'send-email-link',
      //   containerId: 1,
      // });
      toast('На указанный email отправлено сообщение для подтверждения', {
        id: 'send-email-link',
      });

      return response.data;
    } catch (err) {
      toast.error(errorCatch(err));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.login(data);
      // toast.success('Вход выполнен успешно', {
      //   toastId: 'login-success',
      //   containerId: 1,
      // });
      // toast.success('Вход выполнен успешно', {
      //   id: 'login-success',
      // });
      return response.data;
    } catch (err) {
      toast.error(errorCatch(err));
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, thunkAPI) => {
    await AuthService.logout();
  },
);

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewTokens();
      // toast.success('Check Auth success', {
      //   toastId: 'check-auth-success',
      //   containerId: 1,
      // });
      toast.success('Check Auth success', {
        id: 'check-auth-success',
      });
      return response.data;
    } catch (err) {
      if (errorCatch(err) === 'jwt expired') {
        toast.error(errorCatch(err));
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const getProfile = createAsyncThunk<IUser>(
  'user/get-profile',
  async (_, thunkAPI) => {
    try {
      const response = await UserService.getProfile();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
