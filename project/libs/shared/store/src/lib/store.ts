import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TypeRootState = ReturnType<typeof store.getState>;
