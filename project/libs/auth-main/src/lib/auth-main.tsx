import { useState } from 'react';
import styles from './auth-main.module.scss';
import FormReg from './form-reg/form-reg';
import Form from './form/form';
import Title from './title/title';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  const [ectiveform, setEctiveform] = useState("");
  
  // console.log(ectiveform);
  
  return (
    <div className={styles['container']}>
      <div >
        <button className={styles.form_btn} onClick={ ()=> setEctiveform('form')}>Login</button>

        <button className={styles.form_btn} onClick={ ()=> setEctiveform("form-reg")}>Register</button>
      </div>
      <Title />
      {ectiveform === "form" && <Form />}
      {ectiveform === "form-reg" && <FormReg />}
    </div>
  );
}

export default AuthMain;
