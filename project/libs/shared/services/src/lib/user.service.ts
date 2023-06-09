import { axiosAuth, UserApi } from '@project/shared/config';
import { IToggle, IUser, IUserEdit } from '@project/shared/types';
import { saveToStorage } from '@project/shared/utils';

export const UserService = {
  async getProfile() {
    const res = await axiosAuth.get<IUser>(UserApi.getProfile);

    if (res.data.userName)
      localStorage.setItem('user', JSON.stringify(res.data));

    return res;
  },

  async updateProfile(data: IUserEdit) {
    return axiosAuth.put<IUser>(UserApi.updateProfile, data);
  },

  async toggleFavorite(data: IToggle) {
    return axiosAuth.put(UserApi.toggle, data);
  },
};
