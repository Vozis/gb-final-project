import { axiosAuth, axiosClassic } from '@project/shared/config';
import { IEvent, IEventResponse } from '@project/shared/types';

export const EventService = {
  async getAllEvents(searchTerm?: string) {
    return axiosClassic.get<IEventResponse>('/events/all', {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getByUserTags() {
    return axiosAuth.get<IEventResponse>('/events/by-user-hobbies');
  },

  async createEvent(data: FormData) {
    return axiosAuth.post<IEvent>('/events/create', data);
  },
};
