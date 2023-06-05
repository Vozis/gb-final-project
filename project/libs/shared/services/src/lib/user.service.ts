import { axiosAuth, UserApi } from '@project/shared/config';
import { IUser, IUserEdit } from '@project/shared/types';

export const UserService = {
  async getProfile() {
    return axiosAuth.get<IUser>(UserApi.getProfile);
  },

  async updateProfile(data: IUserEdit) {
    return axiosAuth.put<IUser>(UserApi.updateProfile, data);
  },
};
