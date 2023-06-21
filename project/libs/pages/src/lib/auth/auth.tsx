import styles from './auth.module.scss';
import { AuthMain } from '@project/auth-main';

/* eslint-disable-next-line */
export interface AuthProps {}

export function Auth(props: AuthProps) {
  return <AuthMain />;
}

export default Auth;
