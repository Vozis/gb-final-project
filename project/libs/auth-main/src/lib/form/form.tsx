import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './form.module.scss';
import * as process from 'process';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const res = await axios.post('/api/auth/login', data);
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Login Success');
    } catch (err) {
      toast.error(errorCatch(err));
    }
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
