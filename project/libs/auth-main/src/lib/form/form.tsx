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
    console.log('Profile', data);
    login(data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.register_title}>Войдите, чтобы продолжить</p>

      <input
        className={styles.register_form_input}
        placeholder="Login"
        {...register('email', { required: true })}
      />
      {errors.login && (
        <span className={styles['err']}>
          The login field must not be empty!
        </span>
      )}

      <input
        className={styles.register_form_input}
        placeholder="Password"
        type="password"
        {...register('password', { required: true })}
      />
      {errors.pass && (
        <span className={styles['err']}>
          The password field must not be empty!
        </span>
      )}
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
