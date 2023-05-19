import { ToastContainer } from 'react-toastify';
import { store } from '@project/shared/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/* eslint-disable-next-line */

import { FC, PropsWithChildren } from 'react';
import { SharedLayout } from '@project/shared/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const SharedProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SharedLayout>{children}</SharedLayout>
        <ToastContainer autoClose={2000} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Provider>
  );
};

export default SharedProviders;
