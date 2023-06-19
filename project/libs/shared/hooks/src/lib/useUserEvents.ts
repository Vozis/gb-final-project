import { IEventForCard, ISearch } from '@project/shared/types';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { useMemo } from 'react';

const getFilterProfileParamsArray = (id: number): ISearch => {
  return {
    filterNestedFieldsParams: [
      {
        paramsCategory: 'users',
        paramsType: 'id',
        nestedFieldValue: id,
      },
    ],
    filterEventFieldsParams: [
      {
        paramsFilter: 'creator',
        eventFieldValue: id,
      },
    ],
  };
};

export const useUserEvents = (id: number) => {
  const filterProfileParamsArray = useMemo(
    () => getFilterProfileParamsArray(id),
    [id],
  );

  const {
    isLoading,
    data: profileEvents,
    isError,
    error,
    isSuccess,
  } = useQuery(
    ['get-profile-events', id],
    () => EventService.getAllEvents(filterProfileParamsArray),
    {
      select: ({ data }) => data,
      enabled: !!filterProfileParamsArray,
    },
  );

  // console.log(profileEvents);

  const myEvents: IEventForCard[] =
    profileEvents?.filter(event => event.creator?.id === id) || [];

  const participationArr: IEventForCard[] =
    profileEvents?.filter(event => event.users?.some(item => item.id === id)) ||
    [];

  // return { myEvents, participationArr, isLoading };

  return useMemo(
    () => ({
      myEvents,
      participationArr,
      isLoading,
      isSuccess,
    }),
    [profileEvents, isLoading],
  );
};
