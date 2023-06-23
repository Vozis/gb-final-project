import { FC, PropsWithChildren, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

import {
  useActions,
  useAuthRedux,
  useNotificationState,
} from '@project/shared/hooks';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuthRedux();
  const { finishedEvents } = useNotificationState();
  // console.log('finishedEvents:', finishedEvents);

  const { logout, checkAuth, getFinishedEvents, startConnecting } =
    useActions();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      const data = jwt_decode<{
        email: string;
        exp: number;
        iat: number;
        id: number;
        role: string[];
        userName: string;
      }>(accessToken);
      const date = moment().unix();

      if (date >= data.exp) checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken && user) {
      logout();
      navigate('/auth');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;
    getFinishedEvents();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    startConnecting();
  }, [user]);

  return <>{children}</>;
};
