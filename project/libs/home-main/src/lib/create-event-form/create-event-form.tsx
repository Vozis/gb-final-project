import styles from './create-event-form.module.scss';
import { Button, Field, SelectField } from '@project/shared/ui';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IOption, ICreateEvent } from '@project/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventService, TagService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import React from 'react';

/* eslint-disable-next-line */
export interface CreateEventFormProps {
  setActive: React.Dispatch<any>;
}

export function CreateEventForm({ setActive }: CreateEventFormProps) {
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
  const { data: count, isLoading: isCountLoading } = useQuery(
    ['get-count-tags'],
    () => TagService.getByType('count'),
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
    ['create-event'],
    (data: FormData) => EventService.createEvent(data),
    {
      onSuccess: () => {
        toast.success('Event created successfully');
      },
    },
  );

  const onSubmit: SubmitHandler<ICreateEvent> = async data => {
    const formData = new FormData();
    const tags = [];

    const entries: [string, any][] = Object.entries(data).filter(
      entry =>
        entry[0] !== 'sport' &&
        entry[0] !== 'place' &&
        entry[0] !== 'count' &&
        entry[0] !== 'city' &&
        entry[0] !== 'image',
    );

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    if (data.image) {
      formData.append('image', data.image[0]);
    }

    tags.push(data.place[0]);
    tags.push(data.sport[0]);
    tags.push(data.city[0]);
    tags.push(data.count[0]);

    tags.forEach(item => {
      formData.append('tags[]', String(item));
    });

    /* @ts-ignore */
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    // @ts-ignore
    await mutateAsync(formData);
    setActive(false);
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
      <input
        type={'file'}
        placeholder={'Добавь аватар'}
        {...register('image')}
      />
      <Controller
        name={'place'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={place || []}
            field={field}
            placeholder={'Выберите место'}
            isMulti={true}
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
            options={sports || []}
            field={field}
            placeholder={'Выберите занятие'}
            isMulti={true}
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
            options={city || []}
            field={field}
            placeholder={'Укажите город'}
            isMulti={true}
            isLoading={isCityLoading}
            error={error}
          />
        )}
      />
      <Controller
        name={'count'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={count || []}
            field={field}
            placeholder={'Укажите количество людей'}
            isMulti={true}
            isLoading={isCountLoading}
            error={error}
          />
        )}
      />

      <Button className={styles.formBtn} type={'submit'}>
        Создать
      </Button>
    </form>
  );
}

export default CreateEventForm;
