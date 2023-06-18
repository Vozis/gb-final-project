import { Prisma, User } from '@prisma/client';
import { ITag } from './tag.types';
import { IEvent, IEventForCard } from './event.types';
import { Role } from '.prisma/client';

export interface IUser extends User {
  favorites?: IEvent[] | IEventForCard[];
  hobbies?: ITag[] | [];
  creations?: IEvent[] | IEventForCard[];
  events: IEvent[] | IEventForCard[];
  friends?: IUser[] | IUserSingleEvent[];
}

export interface IEventUser {
  id: number;
  userName: string;
}

export interface IUserSingleEvent {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  avatarPath: string;
}

export interface IUserEdit
  extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> {
  hobbies?: ITag[] | [];
  favorites?: IEvent[] | [];
}

export interface IResetPassword {
  id: number;
  data: {
    password: string;
  };
}
