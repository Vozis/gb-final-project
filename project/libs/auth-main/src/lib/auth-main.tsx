import { useState } from 'react';
import styles from './auth-main.module.scss';
import FormReg from './form-reg/form-reg';
import Form from './form/form';
import cn from 'clsx';
import Title from './title/title';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  const [activeForm, setActiveForm] = useState<string>('form');

  return (
    <div>
      <Title />
      <div className={styles.container_btn}>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']: activeForm === 'form',
          })}
          onClick={() => setActiveForm('form')}
        >
          Войти
        </button>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
              activeForm === 'form-reg',
          })}
          onClick={() => setActiveForm('form-reg')}
        >
          Зарегистрироваться
        </button>
      </div>
      {activeForm === 'form' ? <Form /> : <FormReg />}
    </div>
  );
}

export default AuthMain;
