import { useAuthRedux } from '@project/shared/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  const { user } = useAuthRedux();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
};
