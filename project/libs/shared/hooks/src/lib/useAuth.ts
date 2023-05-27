import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';
import { IAuthResponse, ILogin, IRegister } from '@project/shared/types';
import axios from 'axios';
import { useCookies } from './useCookies';
import { AuthService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/auth');
  //   }
  // }, [user]);

  const register = async (data: IRegister) => {
    try {
      const response = await AuthService.register(data);
      toast.success('Успешный вход');
      addUser(response.data.user);
      return response.data;
    } catch (err) {
      toast.error(errorCatch(err));
      throw err;
    }
  };

  const login = async (data: ILogin) => {
    try {
      const response = await AuthService.login(data);
      toast.success('Успешная регистрация');
      addUser(response.data.user);
      return response.data;
    } catch (err) {
      toast.error(errorCatch(err));
      throw err;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    removeUser();
  };

  const checkAuth = async () => {
    try {
      const response = await AuthService.getNewTokens();
      toast.success('Проверка авторизации успешна', {
        toastId: 'check-auth',
      });
      addUser(response.data.user);
      return response.data;
    } catch (err) {
      if (errorCatch(err) === 'jwt expired') {
        toast.error(errorCatch(err));
      }
      throw err;
    }
  };

  return { user, login, register, logout, checkAuth, setUser };
};
