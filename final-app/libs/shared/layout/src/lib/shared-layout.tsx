import styles from './shared-layout.module.scss';
import { FC, PropsWithChildren } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import cn from 'clsx';
import { useTheme } from '@project/shared/hooks';

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <>
      <div className={cn(styles.layout, [theme])}>
        <Header />
        <main className={styles.containerContent}>{children}</main>
        {/*<TransitionProvider className={styles.containerContent}>*/}
        {/*  {children}*/}
        {/*</TransitionProvider>*/}
        <Footer />
      </div>
      <ToastContainer autoClose={2000} containerId={1} />
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default SharedLayout;
