import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/userSlice';
import { filterSlice } from './slices/filterSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'gb-final',
  storage,
  whitelist: ['filter', 'user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
