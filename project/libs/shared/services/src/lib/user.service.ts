import { axiosAuth } from '@project/shared/config';
import { IUser, IUserEdit } from '@project/shared/types';

export const UserService = {
  async getProfile() {
    return axiosAuth.get<IUser>('/user/profile');
  },

  async updateProfile(data: IUserEdit) {
    return axiosAuth.put<IUser>('/user/profile', data);
  },
};
