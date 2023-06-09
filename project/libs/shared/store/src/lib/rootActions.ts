import * as userActions from './actions/userActions';
import { filterSlice } from './slices/filterSlice';

export const rootActions = {
  ...userActions,
  ...filterSlice.actions,
};
