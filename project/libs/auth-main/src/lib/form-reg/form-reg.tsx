import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FormProps } from 'react-router-dom';
import styles from './form-reg.module.scss';

/* eslint-disable-next-line */
export interface FormRegProps {}

export function FormReg(props: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await axios.post('/user', data);
    console.log(res.data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p>Registration form</p>
      <input
        className={styles.register_form_input}
        placeholder="Enter login"
        {...register('login', { required: true })}
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
        {...register('pass', { required: true })}
      />
      {errors.pass && (
        <span className={styles['err']}>
          The password field must not be empty!
        </span>
      )}

      <input type="submit" value="Submit" className={styles.sub_btn} />
    </form>
  );
}

export default FormReg;
