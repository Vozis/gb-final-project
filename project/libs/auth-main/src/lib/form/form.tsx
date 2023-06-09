import { Button, Field } from '@project/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useActions, useAuthRedirect } from '@project/shared/hooks';

import styles from './form.module.scss';
import { toast } from 'react-toastify';
import { ILogin } from '@project/shared/types';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  useAuthRedirect();

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
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
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
        <p className={styles.register_form_save_title}>Забыли пароль?</p>
      </div>
      <Button type={'submit'} className={styles.register_form_btn}>
        ВОЙТИ
      </Button>
    </form>
  );
}

export default Form;
