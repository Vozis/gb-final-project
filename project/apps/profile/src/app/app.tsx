// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import List from './components/List';

export function App() {
  return (
    <div>
      <NxWelcome title="profile" />
      <List />
    </div>
  );
}

export default App;
