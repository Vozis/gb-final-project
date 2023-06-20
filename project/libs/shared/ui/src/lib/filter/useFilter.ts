import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { IEventForCard, ISearch, ISearchForm } from '@project/shared/types';
import { SubmitHandler } from 'react-hook-form';
import { useMemo, useState } from 'react';
import {
  useActions,
  useAuthRedux,
  useFilterState,
} from '@project/shared/hooks';
import Filter from './filter';

export const useFilter = () => {
  const [isUseFilter, setIsUseFilter] = useState<boolean>(false);

  const { user } = useAuthRedux();

  const { setFilterParamsArray } = useActions();
  const { filterParamsArray } = useFilterState();

  // console.log('user: ', user);
  // console.log('filterParamsArray before update: ', filterParamsArray);

  const { isLoading, data: events } = useQuery(
    ['get-all-events-public', filterParamsArray],
    () => EventService.getAllEventsNoUser(filterParamsArray),
    {
      select: ({ data: events }) =>
        events.map(
          (event): IEventForCard => ({
            id: event.id,
            name: event.name,
            imageUrl: event.imageUrl,
            tags: event.tags,
            eventTime: event.eventTime,
            creator: event.creator,
            users: event.users,
            peopleCount: event.peopleCount,
            _count: event._count,
            isParticipate: event.isParticipate,
          }),
        ),
      enabled: user === null,
    },
  );

  const { isLoading: isLoadingAuth, data: authEvents } = useQuery(
    ['get-all-events-auth'],
    () => EventService.getAllEvents({}, true),
    {
      select: ({ data: events }) =>
        events.map(
          (event): IEventForCard => ({
            id: event.id,
            name: event.name,
            imageUrl: event.imageUrl,
            tags: event.tags,
            eventTime: event.eventTime,
            creator: event.creator,
            users: event.users,
            peopleCount: event.peopleCount,
            _count: event._count,
            isParticipate: event.isParticipate,
          }),
        ),
      enabled: !!user,
    },
  );

  const { isLoading: isLoadingAuthWithFilter, data: authEventsWithFilter } =
    useQuery(
      ['get-all-events-auth', filterParamsArray],
      () => EventService.getAllEvents(filterParamsArray, false),
      {
        select: ({ data: events }) =>
          events.map(
            (event): IEventForCard => ({
              id: event.id,
              name: event.name,
              imageUrl: event.imageUrl,
              tags: event.tags,
              eventTime: event.eventTime,
              creator: event.creator,
              users: event.users,
              peopleCount: event.peopleCount,
              _count: event._count,
              isParticipate: event.isParticipate,
            }),
          ),
        enabled: isUseFilter && !!user && !!filterParamsArray,
      },
    );

  const onSubmit: SubmitHandler<ISearchForm> = async (data, event) => {
    event?.preventDefault();

    // console.log('submit data: ', data);

    let result: ISearch = {
      searchParams: [],
      filterNestedFieldsParams: [],
      filterEventFieldsParams: [],
    };

    // console.log('data', data);
    // const entries = Object.entries(data);
    // console.log('entries', entries);

    result.searchParams = [
      {
        paramsSearch: data.paramsSearch || 'name',
        valuesSearch: data.valuesSearch || '',
      },
    ];

    if (data.tags && data.tags.length) {
      data.tags.forEach(tag => {
        result?.filterNestedFieldsParams?.push({
          paramsCategory: 'tags',
          paramsType: 'id',
          nestedFieldValue: tag,
        });
      });
    }

    // console.log('result', result);
    // setIsUseFilter(!isUseFilter);
    setFilterParamsArray(result);
  };

  // console.log('filterParamsArray after update: ', filterParamsArray);

  // return {
  //   events,
  //   isLoading,
  // };
  return useMemo(
    () => ({
      isLoading: user ? isLoadingAuth : isLoading,
      events: user ? authEvents : events,
      onSubmit,
      isUseFilter,
      isLoadingWithFilter: user ? isLoadingAuthWithFilter : isLoading,
      filterEvents: user ? authEventsWithFilter : events,
      setIsUseFilter,
    }),
    [
      events,
      isLoading,
      authEvents,
      isLoadingAuth,
      authEventsWithFilter,
      isLoadingAuthWithFilter,
    ],
  );
};

export default useFilter;
