import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, ILogin, IRegister } from '@project/shared/types';
import { AuthService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

export const register = createAsyncThunk<IAuthResponse, FormData>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await AuthService.register(data);
      toast.success('Register success', {
        toastId: 'register-success',
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
      toast.success('Login success', {
        toastId: 'login-success',
      });

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
      toast.success('Check Auth success', {
        toastId: 'check-auth-success',
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
