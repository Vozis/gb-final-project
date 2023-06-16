import { Button, Field } from '@project/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useActions, useAuthRedirect } from '@project/shared/hooks';

import { ILogin } from '@project/shared/types';
import { useState } from 'react';
import FormReset from '../form-reset/form-reset';
import styles from './form.module.scss';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  useAuthRedirect();

  const [showFormReset, setShowFormReset] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const { login } = useActions();

  const onSubmit: SubmitHandler<ILogin> = async data => {
    login(data);
  };

  return (
    <div>
      {!showFormReset ? (
        <form
          className={styles['register_form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className={styles.register_title}>Войдите, чтобы продолжить</p>

          <Field
            {...register('email', { required: 'Без email никак' })}
            placeholder={'Ваш email...'}
            error={errors.email}
          />

          <Field
            {...register('password', { required: 'Без пароля никак' })}
            placeholder={'Ваш пароль...'}
            error={errors.password}
            visibility
            type={'password'}
          />

          <div className={styles.register_form_save}>
            <button
              onClick={() => setShowFormReset(true)}
              className={styles.register_form_save_title}
            >
              Забыли пароль?
            </button>
          </div>
          <Button type={'submit'} className={styles.register_form_btn}>
            ВОЙТИ
          </Button>
        </form>
      ) : (
        <FormReset />
      )}
    </div>
  );
}

export default Form;
