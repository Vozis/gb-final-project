// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app/app.module.scss';

import NxWelcome from './nx-welcome';
import {HomeMain} from "@project/home-main";

export function App() {
  return (
    <div>
      <HomeMain />
      {/*<h1>Home</h1>*/}
    </div>
  );
}

export default App;
