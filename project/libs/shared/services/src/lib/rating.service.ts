import { IRating, ISearchRating, ISetRating } from '@project/shared/types';
import { axiosAuth, RatingApi } from '@project/shared/config';

export const RatingService = {
  async setRating(data: ISetRating) {
    return axiosAuth.post<IRating>(RatingApi.setRating, data);
  },

  async getAllRating(data?: ISearchRating) {
    return axiosAuth.post<IRating[]>(RatingApi.getAllRating, data);
  },
};
