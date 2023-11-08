import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { ReduxProvider } from './ReduxProvider';
import ThemeProvider from './ThemeProvider';

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
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
