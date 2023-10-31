import { useActions, useAuthRedirect } from '@project/shared/hooks';
import { TagService } from '@project/shared/services';
import { IOption, IRegister } from '@project/shared/types';
import { Button, Field, SelectField, UploadField } from '@project/shared/ui';
import { errorCatch } from '@project/shared/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormProps } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import styles from './form-reg.module.scss';
import { InputActionMeta } from 'react-select';

/* eslint-disable-next-line */
export interface FormRegProps {}

export function FormReg(props: FormProps) {
  useAuthRedirect();
  // --------------------------
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    // Additional validation logic
  };
  // ---------------------------
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm<IRegister>({
    mode: 'onChange',
  });

  const { register } = useActions();

  const [isSport, setIsSport] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isPlace, setIsPlace] = useState(false);

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

  const onSubmit: SubmitHandler<IRegister> = async data => {
    const formData = new FormData();
    const tags: number[] = [];

    // console.log('data:', data);

    const entries: [string, any][] = Object.entries(data).filter(
      entry =>
        entry[0] !== 'sport' &&
        entry[0] !== 'place' &&
        entry[0] !== 'time' &&
        entry[0] !== 'city' &&
        entry[0] !== 'avatar' &&
        entry[0] !== 'confirmPassword',
    );

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    if (data.avatar?.length) {
      formData.append('avatar', data.avatar[0]);
    }

    if (data.sport) {
      data.sport.forEach(item => {
        tags.push(item);
      });
    }
    if (data.place) {
      data.place.forEach(item => {
        tags.push(item);
      });
    }

    if (data.time) {
      data.time.forEach(item => {
        tags.push(item);
      });
    }

    if (data.city) {
      data.city.forEach(item => {
        tags.push(item);
      });
    }

    tags.forEach(item => {
      formData.append('hobbies[]', String(item));
    });

    /* @ts-ignore */
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    register(formData);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.register_form_title}>Регистрация</p>
      <Field
        // className={styles.err}
        {...registerInput('userName', { required: 'Без ника никак' })}
        placeholder={'Ваш ник...'}
        error={errors.userName}
      />
      <Field
        {...registerInput('firstName', { required: 'Без имени никак' })}
        placeholder={'Ваше имя...'}
        error={errors.firstName}
      />
      <Field
        {...registerInput('lastName', { required: 'Без фамилии никак' })}
        placeholder={'Ваша фамилия...'}
        error={errors.lastName}
      />
      <Field
        {...registerInput('email', { required: 'Без email никак' })}
        placeholder={'Ваш email...'}
        error={errors.email}
      />
      <Field
        {...registerInput('password', { required: 'Без пароля никак' })}
        placeholder={'Ваш пароль...'}
        error={errors.password}
        visibility
        type={'password'}
      />
      <Field
        {...registerInput('confirmPassword', {
          required: 'Без ввода пароля никак',
          validate: (value: string) => {
            if (watch('password') !== value) return 'Пароли должны совпадать';
          },
        })}
        placeholder={'Подтвердите пароль...'}
        error={errors.confirmPassword}
        type={'password'}
        visibility
      />
      {/* --------------------------------------- */}
      <UploadField
        {...registerInput('avatar')}
        placeholder={''}
        error={errors.avatar}
      />
      {/*--------------------------------------------- */}
      <h2>
        Укажите свои предпочтения, это позволит получать самое интересное из
        всего списка возможных событий
      </h2>
      <div>
        <h3>Ваш город: </h3>
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
              onInputChange={handleCityInputChange}
            />
          )}
        />
      </div>
      <div>
        <h3>Ваши любимые виды спорта: </h3>
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
              onInputChange={handleSportInputChange}
            />
          )}
        />
      </div>
      <div>
        <h3>Место проведения: </h3>
        <Controller
          name={'place'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              options={place || []}
              field={field}
              placeholder={'Выберите место проведения...'}
              isMulti={true}
              isLoading={isPlaceLoading}
              error={error}
              onInputChange={handlePlaceInputChange}
            />
          )}
        />
      </div>
      <div>
        <h3>Время проведения: </h3>
        <Controller
          name={'time'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectField
              options={time || []}
              field={field}
              placeholder={'Укажите время суток'}
              isMulti={true}
              isLoading={isTimeLoading}
              error={error}
              onInputChange={handleTimeInputChange}
            />
          )}
        />
      </div>
      <Button type={'submit'} className={styles.register_form_btn}>
        Продолжить
      </Button>
    </form>
  );
}

export default FormReg;
