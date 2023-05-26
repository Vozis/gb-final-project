import { User } from '@prisma/client';

export interface IUser extends User {}

export interface IUserEdit
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> {
  times: string[];
}
