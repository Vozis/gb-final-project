import { axiosClassic, TagApi } from '@project/shared/config';
import { ITag } from '@project/shared/types';

export const TagService = {
  async getByType(type: string) {
    return axiosClassic.get<ITag[]>(TagApi.getByType(type));
  },
};
