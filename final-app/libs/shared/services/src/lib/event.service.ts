import { axiosAuth, axiosClassic, EventApi } from '@project/shared/config';
import {
  IEvent,
  IEventResponse,
  ISearch,
  IToggle,
} from '@project/shared/types';
// import { toast } from 'react-toastify';

export const EventService = {
  async getAllEventsNoUser(data?: ISearch) {
    return axiosClassic.get<IEvent[]>(EventApi.getAllNoUser, {
      params: data ? data : {},
    });
  },

  async getUserEvents(userId: number) {
    return axiosAuth.get<IEvent[]>(EventApi.getUserEvents(userId));
  },

  async getAllEvents(
    type: string = 'AND',
    filterSearchDto?: ISearch,
    withHobby?: boolean,
  ) {
    // return axiosAuth.post<IEvent[]>(EventApi.getAll, data, {
    //   params: withHobby ? { withHobby: true } : { withHobby: false },
    // });

    return axiosAuth.get<IEvent[]>(EventApi.getAll, {
      params: filterSearchDto
        ? {
            filterSearchDto,
            withHobby: withHobby ? 'true' : 'false',
            type: type,
          }
        : {},
      // withHobby ? { withHobby: true } : { withHobby: false },
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

  async updateEvent(id: string, data: FormData) {
    return axiosAuth.put<IEvent>(EventApi.updateEvent(id), data, {
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
    //
    // await toast.promise(res, {
    //   loading: 'Loading',
    //   success: 'Got the data',
    //   error: 'Error when fetching',
    // });

    return res.then(data => data);
  },

  async getForRating(id: number) {
    const res = await axiosAuth.get<IEvent>(EventApi.getForRating(id));

    return res.data;
  },
};
