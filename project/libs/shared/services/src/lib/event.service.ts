import { axiosAuth, axiosClassic, EventApi } from '@project/shared/config';
import {
  IEvent,
  IEventResponse,
  ISearch,
  ISearchItem,
  IToggle,
} from '@project/shared/types';
import { toast } from 'react-toastify';

export const EventService = {
  async getAllEvents(filterSearchDto?: ISearch) {
    return axiosClassic.get<IEvent[]>(EventApi.getAll, {
      params: filterSearchDto ? filterSearchDto : {},
    });
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
