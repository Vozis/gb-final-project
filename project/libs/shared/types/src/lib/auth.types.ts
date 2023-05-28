import { ITokens, IUser } from '@project/shared/types';
import { Role } from '.prisma/client';

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
  firstName: string;
  lastName: string;
  userName: string;
  avatar?: string;
  hobbies?: number[];
}
