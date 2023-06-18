import {
  AuthApi,
  axiosAuth,
  axiosClassic,
  UserApi,
} from '@project/shared/config';
import {
  IResetPassword,
  IToggle,
  IUser,
  IUserEdit,
} from '@project/shared/types';
import { saveToStorage } from '@project/shared/utils';

export const UserService = {
  async getProfile() {
    const res = await axiosAuth.get<IUser>(UserApi.getProfile);

    if (res.data.userName)
      localStorage.setItem('user', JSON.stringify(res.data));

    return res;
  },

  async getById(id: string) {
    return axiosClassic.get<IUser>(UserApi.getById(id));
  },

  async updateProfile(data: IUserEdit) {
    return axiosAuth.put<IUser>(UserApi.updateProfile, data);
  },

  async toggleFavorite(data: IToggle) {
    return axiosAuth.put(UserApi.toggle, data);
  },

  async resetPassword(data: IResetPassword) {
    return axiosClassic.put(UserApi.resetPassword, data);
  },
};
