import { axiosClassic, TagApi } from '@project/shared/config';
import { ITag } from '@project/shared/types';

export const TagService = {
  async getByType(typeId: string) {
    return axiosClassic.get<ITag[]>(TagApi.getByType(typeId));
  },
};
