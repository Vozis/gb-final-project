import styles from './hello.module.scss';
import { useAuthRedux } from '@project/shared/hooks';

/* eslint-disable-next-line */
export interface HelloProps {}

export function Hello(props: HelloProps) {
  const { user } = useAuthRedux();

  return <div>{user && <h1>Hello, ${user.firstName}</h1>}</div>;
}

export default Hello;
