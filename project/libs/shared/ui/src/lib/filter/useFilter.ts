import { useQuery } from '@tanstack/react-query';
import { EventService } from '@project/shared/services';
import { ISearch, ISearchForm } from '@project/shared/types';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

export const useFilter = (
  filterParamsArray: ISearch,
  setFilterParamsArray: (data: ISearch) => void,
) => {
  const {
    isLoading,
    isError,
    data: events,
    error,
  } = useQuery(
    ['get-all-events', filterParamsArray],
    () => EventService.getAllEvents(filterParamsArray),
    {
      select: ({ data }) => data,
      enabled: !!filterParamsArray,
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

  return {
    isLoading,
    events,
    onSubmit,
  };
};
