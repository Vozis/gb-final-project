import { useActions } from '@project/shared/hooks';
import { Button } from '@project/shared/ui';
import { useForm } from 'react-hook-form';
import { FormProps } from 'react-router-dom';
import styles from './form-reg.module.scss';

/* eslint-disable-next-line */
export interface FormRegProps {}

export function FormReg(props: FormProps) {
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register } = useActions();

  const onSubmit = async (data: any) => {
    console.log(data);
    register(data);
  };

  return (
    <form className={styles['register_form']} onSubmit={handleSubmit(onSubmit)}>
      <p className={'text-xl mb-4'}>Сперва нужно зарегистрироваться 🙃</p>
      <input
        className={styles.register_form_input}
        placeholder="Enter login"
        {...registerInput('email', { required: true })}
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
        {...registerInput('password', { required: true })}
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

export default FormReg;
