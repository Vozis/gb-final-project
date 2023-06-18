import { useActions, useAuthRedirect } from '@project/shared/hooks';
import { TagService } from '@project/shared/services';
import { IOption, IRegister } from '@project/shared/types';
import { Button, Field, SelectField } from '@project/shared/ui';
import { errorCatch } from '@project/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { FormProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './form-reg.module.scss';

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

  // const { data: sportKinds, isLoading } = useQuery(
  //   ['get-hobbies'],
  //   () => TagService.getByType('sport'),
  //   {
  //     select: ({ data }) =>
  //       data.map(
  //         (item): IOption => ({
  //           label: item.name,
  //           value: item.id,
  //         }),
  //       ),
  //     onError: err => {
  //       toast.error(errorCatch(err));
  //     },
  //   },
  // );

  const onSubmit: SubmitHandler<IRegister> = async data => {
    const formData = new FormData();

    const entries: [string, any][] = Object.entries(data).filter(
      entry =>
        entry[0] !== 'hobbies' &&
        entry[0] !== 'avatar' &&
        entry[0] !== 'confirmPassword',
    );

    entries.forEach(entry => {
      formData.append(entry[0], entry[1]);
    });

    if (data.avatar?.length) {
      formData.append('avatar', data.avatar[0]);
    }

    /* @ts-ignore */
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

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
      <div className={styles.app}>
        <div className={styles.parent}>
          <div className={styles.file_upload}>
            <IconContext.Provider value={{ color: '#2E6D9C', size: '50px' }}>
              <div className={styles.file_upload_img}>
                <AiOutlineUpload />
              </div>
            </IconContext.Provider>
            <h4 className={styles.file_upload_h3}>
              {' '}
              {selectedName || 'Кликните что бы загрузить'}
            </h4>
            <p>Максимальный размер 10mb</p>
            <input
              type={'file'}
              {...registerInput('avatar')}
              // onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      {/*--------------------------------------------- */}
      {/*<Controller*/}
      {/*  name={'hobbies'}*/}
      {/*  control={control}*/}
      {/*  render={({ field, fieldState: { error } }) => (*/}
      {/*    <SelectField*/}
      {/*      options={sportKinds || []}*/}
      {/*      field={field}*/}
      {/*      placeholder={'Выбери свои хобби...'}*/}
      {/*      isMulti={true}*/}
      {/*      isLoading={isLoading}*/}
      {/*      error={error}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}

      <Button type={'submit'} className={styles.register_form_btn}>
        Продолжить
      </Button>
    </form>
  );
}

export default FormReg;
