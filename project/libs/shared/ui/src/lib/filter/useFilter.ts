import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { IEventForCard, ISearch, ISearchForm } from '@project/shared/types';
import { SubmitHandler } from 'react-hook-form';
import { useMemo, useState } from 'react';

export const useFilter = (
  filterParamsArray: ISearch,
  setFilterParamsArray: (data: ISearch) => void,
) => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: events,
    error,
  } = useQuery(
    ['get-all-events'],
    () => EventService.getAllEvents(filterParamsArray),
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
          }),
        ),
    },
  );

  const onSubmit: SubmitHandler<ISearchForm> = async (data, event) => {
    event?.preventDefault();
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

    setFilterParamsArray(result);
  };

  return useMemo(
    () => ({
      isLoading,
      events,
      onSubmit,
    }),
    [events, isLoading],
  );
};
