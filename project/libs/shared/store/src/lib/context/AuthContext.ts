import { IUser } from '@project/shared/types';
import { createContext } from 'react';

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});
