import { ITokens, IUser } from '@project/shared/types';

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar?: string;
  time?: number[];
  sport: number[];
  place: number[];
  city: number[];
}
