import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { ReduxProvider } from './ReduxProvider';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const SharedProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
