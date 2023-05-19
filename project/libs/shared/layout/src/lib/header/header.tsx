import styles from './header.module.scss';
import { IUser } from '@project/shared/types';

/* eslint-disable-next-line */
export interface HeaderProps {
  user: IUser;
}

export function Header(props: HeaderProps) {
  return (
    <header className={'bg-red-500 flex justify-center items-center py-5'}>
      <h1>Header</h1>
    </header>
  );
}

export default Header;
