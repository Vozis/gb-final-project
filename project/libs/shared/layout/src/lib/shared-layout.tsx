import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import Header from './header/header';

import Footer from './footer/footer';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import clsx from 'clsx';
import { useTheme } from '@project/shared/hooks';

/* eslint-disable-next-line */
console.log(styles.layout);
export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <>
      <div className={clsx(styles.layout, [theme])}>
        <Header />
        <main className={styles.containerContent}>{children}</main>
        {/*<TransitionProvider className={styles.containerContent}>*/}
        {/*  {children}*/}
        {/*</TransitionProvider>*/}

        <Footer />
      </div>
      <ToastContainer autoClose={2000} containerId={1} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default SharedLayout;
