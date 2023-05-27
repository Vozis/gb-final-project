import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren } from 'react';
import Header from './header/header';

import Footer from './footer/footer';

/* eslint-disable-next-line */

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.containerContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
