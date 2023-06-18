import { axiosAuth, axiosClassic, EventApi } from '@project/shared/config';
import {
  IEvent,
  IEventForCard,
  IEventResponse,
  ISearch,
  ISearchItem,
  IToggle,
} from '@project/shared/types';
import { toast } from 'react-toastify';

export const EventService = {
  async getAllEventsNoUser(data?: ISearch) {
    return axiosClassic.post<IEvent[]>(EventApi.getAllNoUser, data);
  },

  async getAllEvents(data?: ISearch, withHobby?: boolean) {
    return axiosAuth.post<IEvent[]>(EventApi.getAll, data, {
      params: withHobby ? { withHobby: true } : { withHobby: false },
    });
  },

  async getSingleEventNoUser(id: string) {
    return axiosClassic.get<IEvent>(EventApi.getByIdNoUser(id));
  },

  async getSingleEvent(id: string) {
    return axiosAuth.get<IEvent>(EventApi.getById(id));
  },

  async getByUserTags() {
    return axiosAuth.get<IEventResponse>(EventApi.getByUserHobbies);
  },

  async createEvent(data: FormData) {
    return axiosAuth.post<IEvent>(EventApi.createEvent, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async toggleUser(id: number, data: IToggle) {
    const res = axiosAuth.post<IEvent>(EventApi.toggleUser(id), data);

    // await toast.promise(res, {
    //   pending: 'Posting',
    //   success: {
    //     render({ data }) {
    //       return `Добавили событие ${data?.data.name}`;
    //     },
    //     icon: '🟢',
    //   },
    //   error: 'error message',
    // });

    return res.then(data => data);
  },
};
