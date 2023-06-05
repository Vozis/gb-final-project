import { IAuthResponse, ILogin, IRegister } from '@project/shared/types';
import { AuthApi, axiosClassic } from '@project/shared/config';
import { removeTokensFromStorage, saveToStorage } from '@project/shared/utils';
import Cookies from 'js-cookie';

export const AuthService = {
  async register(data: FormData) {
    const response = await axiosClassic.post<IAuthResponse>(
      AuthApi.register,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },

  async login(data: ILogin) {
    const response = await axiosClassic.post<IAuthResponse>(
      AuthApi.login,
      data,
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },

  async logout() {
    removeTokensFromStorage();
    localStorage.removeItem('user');
  },
  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken');
    let jsonToken;
    if (refreshToken) {
      jsonToken = JSON.parse(refreshToken);
    }

    const response = await axiosClassic.post<IAuthResponse>(
      AuthApi.getNewTokens,
      { refreshToken: jsonToken },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
