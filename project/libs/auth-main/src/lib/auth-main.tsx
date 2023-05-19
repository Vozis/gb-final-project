import styles from './auth-main.module.scss';

/* eslint-disable-next-line */
export interface AuthMainProps {}

export function AuthMain(props: AuthMainProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthMain!</h1>
    </div>
  );
}

export default AuthMain;
