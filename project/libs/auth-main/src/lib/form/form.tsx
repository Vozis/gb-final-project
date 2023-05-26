import { Button } from '@project/shared/ui';
import { useForm } from 'react-hook-form';

import { useActions, useAuthRedirect } from '@project/shared/hooks';

import styles from './form.module.scss';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  useAuthRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useActions();

  const onSubmit = async (data: any) => {
    console.log(data);
    login(data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={'text-xl mb-4'}>Войдите, чтобы продолжить</p>

      <input
        className={styles.register_form_input}
        placeholder="Enter login"
        {...register('email', { required: true })}
      />
      {errors.login && (
        <span className={styles['err']}>
          The login field must not be empty!
        </span>
      )}

      <input
        className={styles.register_form_input}
        placeholder="Enter password"
        type="password"
        {...register('password', { required: true })}
      />
      {errors.pass && (
        <span className={styles['err']}>
          The password field must not be empty!
        </span>
      )}

      <Button type={'submit'}>Продолжить</Button>
    </form>
  );
}

export default Form;
