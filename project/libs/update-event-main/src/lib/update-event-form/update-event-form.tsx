import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IOption, IUpdateEvent } from '@project/shared/types';
import { EventService, TagService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { errorCatch, getKeys } from '@project/shared/utils';
import {
  Button,
  Field,
  Heading,
  SelectField,
  UploadField,
} from '@project/shared/ui';

/* eslint-disable-next-line */
export interface UpdateEventFormProps {
  eventId: string;
}

export function UpdateEventForm({ eventId }: UpdateEventFormProps) {
  const queryClient = useQueryClient();
  const [eventUpdate, setEventUpdate] = useState<IUpdateEvent>({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IUpdateEvent>();

  const { isLoading } = useQuery(
    ['get-single-event'],
    () => EventService.getSingleEvent(eventId),
    {
      onSuccess: ({ data }) => {
        // const date = moment().format('YYYY-MM-DDTHH:MM');
        // date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        // date.toISOString().slice(0, 16);
        // console.log('date: ', date);
        const eventData: IUpdateEvent = {
          name: data.name,
          description: data.description,
          peopleCount: data.peopleCount,
          eventTime: `${data.eventTime.split(':')[0]}:${
            data.eventTime.split(':')[1]
          }`,
          place: data.tags
            .filter(tag => tag.type.name === 'place')
            .map(tag => tag.id),
          city: data.tags
            .filter(tag => tag.type.name === 'city')
            .map(tag => tag.id),
          sport: data.tags
            .filter(tag => tag.type.name === 'sport')
            .map(tag => tag.id),
        };

        setEventUpdate(eventData);
      },
      enabled: !!eventId,
    },
  );

  useEffect(() => {
    // console.log('eventUpdate: ', eventUpdate);

    getKeys(eventUpdate).forEach(key => {
      setValue(key, eventUpdate[key]);
    });
  }, [eventUpdate]);

  const { data: sports, isLoading: isSportsLoading } = useQuery(
    ['get-sport-tags'],
    () => TagService.getByType('sport'),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            label: item.name,
            value: item.id,
          }),
        ),
      onError: err => {
        toast.error(errorCatch(err));
      },
    },
  );

  const { data: place, isLoading: isPlaceLoading } = useQuery(
    ['get-place-tags'],
    () => TagService.getByType('place'),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            label: item.name,
            value: item.id,
          }),
        ),
      onError: err => {
        toast.error(errorCatch(err));
      },
    },
  );

  const { data: city, isLoading: isCityLoading } = useQuery(
    ['get-city-tags'],
    () => TagService.getByType('city'),
    {
      select: ({ data }) =>
        data.map(
          (item): IOption => ({
            label: item.name,
            value: item.id,
          }),
        ),
      onError: err => {
        toast.error(errorCatch(err));
      },
    },
  );

  const { mutateAsync, isSuccess } = useMutation(
    ['update-event'],
    (data: FormData) => EventService.updateEvent(eventId, data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['get-all-events']);
        // toast.success('Параметры события успешно обновлены', {
        //   toastId: 'update-events',
        //   containerId: 1,
        // });
        toast.success('Параметры события успешно обновлены', {
          id: 'update-events',
        });
      },
    },
  );

  const onSubmit: SubmitHandler<IUpdateEvent> = async (data, event) => {
    const formData = new FormData();
    const tags = [];

    // console.log('data: ', data);

    const entries: [string, any][] = Object.entries(data).filter(
      entry =>
        entry[0] !== 'sport' &&
        entry[0] !== 'place' &&
        entry[0] !== 'time' &&
        entry[0] !== 'city' &&
        entry[0] !== 'image',
    );

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    if (data.image) {
      formData.append('image', data.image[0]);
    }

    if (data.sport) {
      tags.push(data.sport);
    }
    if (data.place) {
      tags.push(data.place);
    }

    if (data.time) {
      tags.push(data.time);
    }

    if (data.city) {
      tags.push(data.city);
    }

    tags.forEach(item => {
      formData.append('tags[]', String(item));
    });

    /* @ts-ignore */
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    await mutateAsync(formData);
    navigate(-1);
  };

  return (
    <div>
      <Heading className={'text-center'}>Редактирование события:</Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col gap-3 items-center'}
      >
        <Field
          placeholder={'Название'}
          {...register('name', { required: false })}
        />
        <Field
          placeholder={'Описание'}
          {...register('description', { required: false })}
        />
        <Field
          placeholder={'Планируемая дата'}
          type={'datetime-local'}
          {...register('eventTime', { required: false })}
        />
        <Field
          placeholder={'Количество людей'}
          type={'number'}
          {...register('peopleCount', { required: false })}
        />
        <UploadField
          {...register('image')}
          placeholder={''}
          error={errors.image}
        />
        <Controller
          name={'place'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              defaultValue={eventUpdate.place}
              options={place || []}
              field={field}
              placeholder={'Выберите место'}
              isMulti={false}
              isLoading={isPlaceLoading}
              error={error}
            />
          )}
        />
        <Controller
          name={'sport'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              defaultValue={eventUpdate.sport}
              options={sports || []}
              field={field}
              placeholder={'Выберите занятие'}
              isMulti={false}
              isLoading={isSportsLoading}
              error={error}
            />
          )}
        />
        <Controller
          name={'city'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              defaultValue={eventUpdate.city}
              options={city || []}
              field={field}
              placeholder={'Укажите город'}
              isMulti={false}
              isLoading={isCityLoading}
              error={error}
            />
          )}
        />

        <Button
          className={
            'bg-sky-500 text-gray-100 rounded-md px-8 mt-5 border-none hover:bg-sky-700 hover:text-white'
          }
          type={'submit'}
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
}

export default UpdateEventForm;
