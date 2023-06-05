import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren } from 'react';
import Header from './header/header';

import Footer from './footer/footer';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

/* eslint-disable-next-line */

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <main className={styles.containerContent}>{children}</main>
        <Footer />
      </div>
      <ToastContainer autoClose={2000} containerId={1} />
      {/*<Toaster />*/}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default SharedLayout;
