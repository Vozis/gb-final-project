import { axiosAuth, EventApi } from '@project/shared/config';
import { IEvent } from '@project/shared/types';

export const NotificationService = {
  async getFinishedEvents() {
    return axiosAuth.get<IEvent[]>(EventApi.getFinishedEvents);
  },
};
