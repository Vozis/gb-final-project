import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form.module.scss';
import * as process from 'process';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  const [type, setType] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const res = await axios.post('/user', data);
    localStorage.setItem(`/login`, JSON.stringify(res.data));
    console.log(res.data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p>authorization form</p>

      <input
        placeholder="Enter login"
        {...register('login', { required: true })}
      />
      {errors.login && (
        <span className={styles['err']}>
          The login field must not be empty!
        </span>
      )}

      <input
        placeholder="Enter password"
        type="password"
        {...register('pass', { required: true })}
      />
      {errors.pass && (
        <span className={styles['err']}>
          The password field must not be empty!
        </span>
      )}

      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
