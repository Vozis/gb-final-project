import { Role, User } from '@prisma/client';

export interface IReturnUserObject extends Omit<User, 'password'> {}

export interface ReturnAuth {
  user: IReturnUserObject;
  accessToken: string;
  refreshToken: string;
}

// export type TypeRole = 'USER' | 'ADMIN';
