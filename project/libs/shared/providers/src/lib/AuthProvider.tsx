import { FC, PropsWithChildren, useEffect } from 'react';

import { useActions, useAuthRedux } from '@project/shared/hooks';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuthRedux();

  const { logout, checkAuth } = useActions();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken && user) {
      logout();
      navigate('/auth');
    }
  }, [location.pathname]);

  return <>{children}</>;
};
