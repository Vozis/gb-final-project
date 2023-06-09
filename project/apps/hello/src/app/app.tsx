// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { useAuthRedux } from '@project/shared/hooks';

export function App() {
  const { user } = useAuthRedux();

  return <div>{user && <h1>Hello, ${user.firstName}</h1>}</div>;
}

export default App;
