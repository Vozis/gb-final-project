import { axiosAuth } from '@project/shared/config';
import { ILike } from '@project/shared/types';

export const LikeService = {
  async toggleCommentLike(data: { commentId: number }) {
    return axiosAuth.post<ILike>('/likes/toggle', data);
  },
};
