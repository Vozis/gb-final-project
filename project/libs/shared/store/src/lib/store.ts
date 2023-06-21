import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/userSlice';
import { reducer as notificationReducer } from './slices/notificationSlice';
import { reducer as commentReducer } from './slices/commentSlice';
import { reducer as filterReducer } from './slices/filterSlice';
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
import { commentMiddleware } from './middleware/socket.middleware';

const persistConfig = {
  key: 'gb-final',
  storage,
  whitelist: ['user', 'filter', 'notification'],
};

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  notification: notificationReducer,
  comments: commentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([commentMiddleware]),
  devTools: true,
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
