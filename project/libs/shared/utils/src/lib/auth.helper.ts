import Cookies from 'js-cookie';
import { IAuthResponse, ITokens } from '@project/shared/types';
export const saveTokensToStorage = (data: ITokens) => {
  Cookies.set('accessToken', JSON.stringify(data.accessToken));
  Cookies.set('refreshToken', JSON.stringify(data.refreshToken));
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensToStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const removeTokensFromStorage = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
