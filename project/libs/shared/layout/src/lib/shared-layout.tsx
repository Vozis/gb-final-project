import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import Header from './header/header';

import Footer from './footer/footer';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { TransitionProvider } from '@project/shared/providers';
import clsx from 'clsx';
import { Theme, ThemeContext } from '../../../theme/ThemeContext';
import { useTheme } from '@project/shared/hooks';

/* eslint-disable-next-line */

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div
        className={clsx(styles.layout, {
          [styles.dark]: theme === 'dark',
        })}
      >
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
