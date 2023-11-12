import { ITag } from './tag.types';
import { IEvent, IEventForCard } from './event.types';

export enum EnumRole {
  USER= 'USER',
  ADMIN= 'ADMIN',
}

export interface IUser {
  id: number
  email: string
  password: string
  avatarPath: string
  role: EnumRole[]
  createdAt: Date
  updatedAt: Date
  firstName: string
  lastName: string
  userName: string
  isConfirmed: boolean
  exitDate: Date
  averageRating: number
  favorites?: IEvent[] | IEventForCard[];
  hobbies?: ITag[] | [];
  creations?: IEvent[] | IEventForCard[];
  events: IEvent[] | IEventForCard[];
  friends?: IUser[] | IUserSmall[];
}

export interface IEventUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  averageRating: number;
}

export interface IUserSmall {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  avatarPath: string;
  averageRating: number;
}

export interface IUserEdit
  extends Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> {
  hobbies?: ITag[] | [];
  favorites?: IEvent[] | [];
}

export interface IResetPassword {
  id: number;
  data: {
    password: string;
  };
}

export interface IUserUpdateForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  avatar?: string;
  sport?: number[];
  place?: number[];
  city?: number[];
}
