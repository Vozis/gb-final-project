import * as userActions from './actions/userActions';
import * as notificationActions from './actions/notificationActions';
import { filterSlice } from './slices/filterSlice';

export const rootActions = {
  ...userActions,
  ...filterSlice.actions,
  ...notificationActions,
};
