import { axiosAuth, axiosClassic } from '@project/shared/config';

export const EventService = {
  async getAllEvents() {
    return axiosClassic.get('/events/all');
  },

  async getByUserTags() {
    return axiosAuth.get('/events/by-user-hobbies');
  },

  async createEvent(data: any) {
    return axiosAuth.post('/events/create', data);
  },
};
