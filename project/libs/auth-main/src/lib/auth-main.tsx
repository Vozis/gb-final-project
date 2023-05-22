import { useState } from 'react';
import styles from './auth-main.module.scss';
import FormReg from './form-reg/form-reg';
import Form from './form/form';
import Title from './title/title';
import cn from 'clsx';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  const [activeform, setActiveform] = useState<string>('form');

  // console.log(ectiveform);

  return (
    <div>
      <Title />
      <div className={styles.container_btn}>
        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']: activeform === 'form',
          })}
          onClick={() => setActiveform('form')}
        >
          Войти
        </button>

        <button
          className={cn('text-black', {
            ['text-[#1F3EE3] border-b border-[#1F3EE3]']:
              activeform === 'form-reg',
          })}
          onClick={() => setActiveform('form-reg')}
        >
          Зарегистрироваться
        </button>
      </div>

      {activeform === 'form' ? <Form /> : <FormReg />}
    </div>
  );
}

export default AuthMain;
