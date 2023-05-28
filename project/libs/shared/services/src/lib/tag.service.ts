import { axiosClassic } from '@project/shared/config';
import { ITag } from '@project/shared/types';

export const TagService = {
  async getByType(type: string) {
    return axiosClassic.get<ITag[]>(`/tags/by-type/${type}`);
  },
};
