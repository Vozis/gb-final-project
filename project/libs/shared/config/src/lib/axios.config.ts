import axios from 'axios';

import { errorCatch } from '@project/shared/utils';
import { AuthService } from '@project/shared/services';
import Cookies from 'js-cookie';

const axiosOptions = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosClassic = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuth = axios.create(axiosOptions);

axiosAuth.interceptors.request.use(config => {
  const accessToken = Cookies.get('accessToken');

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return axiosAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
        }
      }
    }
    throw error;
  },
);
