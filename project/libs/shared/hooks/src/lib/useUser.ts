import { useContext } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { AuthContext } from '@project/shared/store';
import { IUser } from '@project/shared/types';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);

  const { setItem } = useLocalStorage();

  const addUser = (user: IUser) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, removeUser, setUser };
};
