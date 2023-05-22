import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren } from 'react';
import Header from './header/header';
import { IUser } from '@project/shared/types';
import Footer from './footer/footer';

/* eslint-disable-next-line */

const user: IUser = {
  name: 'Ilya',
};

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header user={user} />
      <main className={styles.containerContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
