import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '@project/shared/store';
import { PersistGate } from 'redux-persist/integration/react';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
