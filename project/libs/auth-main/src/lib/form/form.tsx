import styles from './form.module.scss';
import { Avatar } from '@project/shared/ui';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface FormProps {}

export function Form(props: FormProps) {
  const [type, setType] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async data => {
    console.log(data);

    if (type === 'login') {
    }
    const response = await axios.post('http://localhost:5000/api/users', data);

    console.log(response.data);
  };

  if (type === 'login') {
    //   await axios.post('/api/login', data);
    // } else {
    //   await axios.post('/api/register', data);
    // }

    navigate('/home');
  }

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className={''}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register('example')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register('exampleRequired', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
      <button>Login</button>
      <button onClick={() => setType('login')}>Login</button>
      <button onClick={() => setType('register')}>regoster</button>
    </form>
  );
}

export default Form;
