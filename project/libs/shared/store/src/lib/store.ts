import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/userSlice';
import { filterSlice } from './slices/filterSlice';

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TypeRootState = ReturnType<typeof store.getState>;
