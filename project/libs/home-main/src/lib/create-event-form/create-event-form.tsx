import { Button, Field, SelectField, UploadField } from '@project/shared/ui';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICreateEvent, IOption } from '@project/shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EventService, TagService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import React, { useState } from 'react';
import { InputActionMeta } from 'react-select';

/* eslint-disable-next-line */
export interface CreateEventFormProps {}

export function CreateEventForm(props: CreateEventFormProps) {
  const [isSport, setIsSport] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isPlace, setIsPlace] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<ICreateEvent>();

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
      enabled: isSport,
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

  const { data: time, isLoading: isTimeLoading } = useQuery(
    ['get-count-tags'],
    () => TagService.getByType('time'),
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
      enabled: isTime,
    },
  );

  // console.log('sports: ', sports);
  // console.log('time: ', time);
  // console.log('city: ', city);
  // console.log('place: ', place);

  const handleSportInputChange = (meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setIsSport(true);
    }
  };

  const handleTimeInputChange = (meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setIsTime(true);
    }
  };

  const handleCityInputChange = (meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setIsCity(true);
    }
  };

  const handlePlaceInputChange = (meta: InputActionMeta) => {
    if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
      setIsPlace(true);
    }
  };

  const { mutateAsync, isSuccess } = useMutation(
    ['create-event'],
    (data: FormData) => EventService.createEvent(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['get-all-events']);
        toast.success('Event created successfully');
      },
    },
  );

  const onSubmit: SubmitHandler<ICreateEvent> = async (data, event) => {
    const formData = new FormData();
    const tags = [];

    console.log('data: ', data);

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        placeholder={'Название'}
        {...register('name', { required: true })}
      />
      <Field
        placeholder={'Описание'}
        {...register('description', { required: true })}
      />
      <Field
        placeholder={'Планируемая дата'}
        type={'datetime-local'}
        {...register('eventDate', { required: false })}
      />
      <Field
        placeholder={'Количество людей'}
        type={'number'}
        {...register('count', { required: true })}
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
            options={place || []}
            field={field}
            placeholder={'Выберите место'}
            isMulti={false}
            isLoading={isPlaceLoading}
            error={error}
            onInputChange={handlePlaceInputChange}
          />
        )}
      />
      <Controller
        name={'sport'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={sports || []}
            field={field}
            placeholder={'Выберите занятие'}
            isMulti={false}
            isLoading={isSportsLoading}
            error={error}
            onInputChange={handleSportInputChange}
          />
        )}
      />
      <Controller
        name={'city'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={city || []}
            field={field}
            placeholder={'Укажите город'}
            isMulti={false}
            isLoading={isCityLoading}
            error={error}
            onInputChange={handleCityInputChange}
          />
        )}
      />
      <Controller
        name={'time'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={time || []}
            field={field}
            placeholder={'Укажите время суток'}
            isMulti={false}
            isLoading={isTimeLoading}
            error={error}
            onInputChange={handleTimeInputChange}
          />
        )}
      />

      <Button
        className={
          'bg-sky-500 text-gray-100 rounded-md px-8 mt-5 border-none hover:bg-sky-700 hover:text-white'
        }
        type={'submit'}
      >
        Создать
      </Button>
    </form>
  );
}

export default CreateEventForm;
