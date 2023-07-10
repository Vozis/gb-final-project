import styles from './update-user-form.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IOption, IUserUpdateForm } from '@project/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TagService, UserService } from '@project/shared/services';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { errorCatch, getKeys } from '@project/shared/utils';
import { useActions, useAuthRedux } from '@project/shared/hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Field,
  Heading,
  SelectField,
  UploadField,
} from '@project/shared/ui';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface UpdateUserFormProps {}

export function UpdateUserForm(props: UpdateUserFormProps) {
  const { getProfile } = useActions();
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const [userUpdate, setUserUpdate] = useState<IUserUpdateForm>({});
  const [changePassword, setChangePassword] = useState<boolean>(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  useEffect(() => {
    getProfile();
    setUserUpdate({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: user.password,
      city:
        (user.hobbies &&
          user?.hobbies
            .filter(hobby => hobby.type.name === 'city')
            .map(hobby => hobby.id)) ||
        [],
      place:
        (user.hobbies &&
          user?.hobbies
            .filter(hobby => hobby.type.name === 'place')
            .map(hobby => hobby.id)) ||
        [],
      sport:
        (user.hobbies &&
          user?.hobbies
            .filter(hobby => hobby.type.name === 'sport')
            .map(hobby => hobby.id)) ||
        [],
    });
  }, []);

  useEffect(() => {
    // console.log(userUpdate);

    getKeys(userUpdate).forEach(key => {
      setValue(key, userUpdate[key]);
    });
  }, [userUpdate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm<IUserUpdateForm>({
    mode: 'onChange',
  });

  // const handleSportInputChange = (meta: InputActionMeta) => {
  //   if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
  //     setIsSport(true);
  //   }
  // };
  //
  // const handleTimeInputChange = (meta: InputActionMeta) => {
  //   if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
  //     setIsTime(true);
  //   }
  // };
  //
  // const handleCityInputChange = (meta: InputActionMeta) => {
  //   if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
  //     setIsCity(true);
  //   }
  // };
  //
  // const handlePlaceInputChange = (meta: InputActionMeta) => {
  //   if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
  //     setIsPlace(true);
  //   }
  // };

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

  const { mutateAsync } = useMutation(
    ['update-user'],
    (data: FormData) => UserService.updateProfile(data),
    {
      onSuccess: async () => {
        getProfile();
        // toast.success('Данные пользователя успешно обновлены', {
        //   toastId: 'update-profile',
        //   containerId: 1,
        // });
        toast.success('Данные пользователя успешно обновлены', {
          id: 'update-profile',
        });
      },
    },
  );

  const onSubmit: SubmitHandler<IUserUpdateForm> = async data => {
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
      if (entry[1]) {
        formData.append(entry[0], entry[1]);
      }
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

    await mutateAsync(formData);
    navigate('/profile');
  };

  return (
    <div>
      <Heading className={'text-center'}>Редактировать профиль:</Heading>
      <form
        className={styles['register_form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          {...register('userName')}
          placeholder={'Ваш ник...'}
          error={errors.userName}
          className={styles.input}
        />
        <Field
          {...register('firstName')}
          placeholder={'Ваше имя...'}
          error={errors.firstName}
        />
        <Field
          {...register('lastName')}
          placeholder={'Ваша фамилия...'}
          error={errors.lastName}
        />
        <Field
          {...register('email')}
          placeholder={'Ваш email...'}
          error={errors.email}
        />
        <label className={'flex gap-2'}>
          <p>Сменить пароль ?</p>
          <input
            type="checkbox"
            onChange={() => setChangePassword(!changePassword)}
          />
        </label>
        <div
          className={cn({
            ['invisible hidden']: !changePassword,
          })}
        >
          <Field
            {...register('password')}
            placeholder={'Ваш пароль...'}
            error={errors.password}
            visibility
            type={'password'}
          />
          {/*<Field*/}
          {/*  {...register('confirmPassword', {*/}
          {/*    validate: (value: string | undefined) => {*/}
          {/*      if (watch('password') !== value)*/}
          {/*        return 'Пароли должны совпадать';*/}
          {/*    },*/}
          {/*  })}*/}
          {/*  placeholder={'Подтвердите пароль...'}*/}
          {/*  error={errors.confirmPassword}*/}
          {/*  type={'password'}*/}
          {/*  visibility*/}
          {/*/>*/}
        </div>

        <UploadField
          {...register('avatar')}
          placeholder={''}
          error={errors.avatar}
        />

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
              />
            )}
          />
        </div>
        <Button type={'submit'}>Сохранить</Button>
      </form>
    </div>
  );
}

export default UpdateUserForm;
