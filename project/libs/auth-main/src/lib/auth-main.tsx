import styles from './auth-main.module.scss';
import Form from './form/form';
import Title from './title/title';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  return (
    <div className={styles['container']}>
      <Form />
      <Title />
    </div>
  );
}

export default AuthMain;
