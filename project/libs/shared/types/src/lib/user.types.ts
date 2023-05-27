import { User } from '@prisma/client';
import { ITag } from './tag.types';
import { IEvent } from './event.types';

export interface IUser extends User {}

export interface IUserEdit
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> {
  hobbies?: ITag[] | [];
  favorites?: IEvent[] | [];
}
