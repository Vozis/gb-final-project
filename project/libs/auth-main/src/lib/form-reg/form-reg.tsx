import { useActions } from '@project/shared/hooks';
import { Button, Field, SelectField } from '@project/shared/ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormProps } from 'react-router-dom';
import styles from './form-reg.module.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TagService } from '@project/shared/services';
import { IOption, IRegister } from '@project/shared/types';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';

/* eslint-disable-next-line */
export interface FormRegProps {}

export function FormReg(props: FormProps) {
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<IRegister>({
    mode: 'onChange',
  });

  const { register } = useActions();

  const { data: sportKinds, isLoading } = useQuery(
    ['get-hobbies'],
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

  const onSubmit: SubmitHandler<IRegister> = async data => {
    const formData = new FormData();
    console.log(data.avatar);

    const entries: [string, any][] = Object.entries(data).filter(
      entry => entry[0] !== 'hobbies' && entry[0] !== 'avatar',
    );

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    if (data.avatar) {
      formData.append('avatar', data.avatar[0]);
    }

    /* @ts-ignore */
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    register(formData);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={'text-xl mb-4'}>Сперва нужно зарегистрироваться 🙃</p>
      <Field
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
      />
      <input
        type={'file'}
        placeholder={'Добавь аватар'}
        {...registerInput('avatar')}
      />
      <Controller
        name={'hobbies'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectField
            options={sportKinds || []}
            field={field}
            placeholder={'Выбери свои хобби...'}
            isMulti={true}
            isLoading={isLoading}
            error={error}
          />
        )}
      />

      <Button type={'submit'}>Продолжить</Button>
    </form>
  );
}

export default FormReg;
