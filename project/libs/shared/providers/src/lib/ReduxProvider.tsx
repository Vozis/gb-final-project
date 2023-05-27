import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@project/shared/store';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
