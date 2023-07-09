import { axiosAuth, axiosClassic, UserApi } from '@project/shared/config';
import {
  IResetPassword,
  IToggle,
  IUser,
  IUserSmall,
} from '@project/shared/types';

export const UserService = {
  async getProfile() {
    const res = await axiosAuth.get<IUser>(UserApi.getProfile);

    if (res.data.userName)
      localStorage.setItem('user', JSON.stringify(res.data));

    return res;
  },

  async getByIdNoUser(id: string) {
    return axiosClassic.get<IUser>(UserApi.getByIdNoUser(id));
  },

  async getById(id: string) {
    return axiosAuth.get<IUser>(UserApi.getById(id));
  },

  async updateProfile(data: FormData) {
    return axiosAuth.put<IUser>(UserApi.updateProfile, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async toggleFavorite(data: IToggle) {
    return axiosAuth.put(UserApi.toggle, data);
  },

  async toggleFriend(data: IToggle) {
    return axiosAuth.put<IUser>(UserApi.toggle, data);
  },

  async resetPassword(data: IResetPassword) {
    return axiosClassic.put(UserApi.resetPassword, data);
  },

  async getAllUsers(searchTerm?: string) {
    return axiosAuth.get<IUserSmall[]>(UserApi.getAll, {
      params: searchTerm ? { searchTerm } : {},
    });
  },
};
