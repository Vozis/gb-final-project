import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/userSlice';
import { reducer as notificationReducer } from './slices/notificationSlice';
import { reducer as commentReducer } from './slices/commentSlice';
import { reducer as filterReducer } from './slices/filterSlice';
import { reducer as socketReducer } from './slices/socketSlice';
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
import socketMiddleware from './middleware/socket.middleware';
import { useDispatch } from 'react-redux';

const persistConfig = {
  key: 'gb-final',
  storage,
  whitelist: ['user', 'filter', 'notification', 'comments'],
  blacklist: ['socket'],
};

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  comments: commentReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([socketMiddleware]),
  devTools: true,
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
