import clsx from 'clsx';
import { useState } from 'react';
import styles from './auth-main.module.scss';
import FormReg from './form-reg/form-reg';
import Form from './form/form';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  const [activeForm, setActiveForm] = useState<'form' | 'form-reg'>('form');

  return (
    <div className={styles.container_form}>
      {/* <Title /> */}
      {activeForm === 'form' ? <Form /> : <FormReg />}
      <div className={styles.container_btn}>
        <button
          className={clsx(
            activeForm === 'form-reg' ? styles.form_btn : styles.form_btn_none,
          )}
          onClick={() => setActiveForm('form')}
        >
          войти
        </button>
        <button
          className={clsx(
            activeForm === 'form' ? styles.form_btn : styles.form_btn_none,
          )}
          // className={cn('text-black', {
          //   ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
          //     activeForm === 'form-reg',
          // })}
          onClick={() => setActiveForm('form-reg')}
        >
          зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default AuthMain;
