import axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from '@project/shared/hooks';
import { errorCatch } from '@project/shared/utils';
import { AuthService } from '@project/shared/services';

const axiosOptions = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosClassic = axios.create(axiosOptions);

export const axiosAuth = axios.create(axiosOptions);

axiosAuth.interceptors.request.use(config => {
  const { getCookie } = useCookies();

  const accessToken = getCookie('accessToken');

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  config => config,
  async error => {
    const { removeCookie } = useCookies();
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
          removeCookie('accessToken');
          removeCookie('refreshToken');
        }
      }
    }
    throw error;
  },
);
