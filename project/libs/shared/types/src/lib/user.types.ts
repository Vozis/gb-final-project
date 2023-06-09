import { Prisma, User } from '@prisma/client';
import { ITag } from './tag.types';
import { IEvent } from './event.types';

export interface IUser extends User {
  favorites?: IEvent[] | [];
  hobbies?: ITag[] | [];
  creations?: IEvent[] | [];
  events?: IEvent[] | [];
  friends?: IUser[] | [];
}

export interface IEventUser {
  id: number;
  userName: string;
}

export interface IUserEdit
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> {
  hobbies?: ITag[] | [];
  favorites?: IEvent[] | [];
}
